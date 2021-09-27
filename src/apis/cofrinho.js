//Uses Browsers IndexedDB as Database
//https://hackernoon.com/use-indexeddb-with-idb-a-1kb-library-that-makes-it-easy-8p1f3yqq

import { openDB } from 'idb'

import AccountModel from '../models/account'

const name    = 'cofrinho' //database name
const version = 1 //database version

const collectionsDefaultConfigs = {
  keyPath: "id", //defines entity identification
  autoIncrement: true //This object store can only hold JavaScript objects. Usually a key is generated and the value of the generated key is stored in the object in a property with the same name as the key path. However, if such a property already exists, the value of that property is used as key rather than generating a new key.
}

const collections = [
  { 
    name: "accounts", 
    config: { ...collectionsDefaultConfigs },
    indexes: ["createdAt"]
  },
  {
    name: "earnings",
    config: { ...collectionsDefaultConfigs },
    indexes: ["createdAt"]
  },
  {
    name: "expenses",
    config: { ...collectionsDefaultConfigs },
    indexes: ["createdAt"]
  },
  { 
    name: "user",
    config: { ...collectionsDefaultConfigs }
  }
]

const initialAccounts = [
  {
    title: "Despesas Básicas",
    quota: 0.5
  },
  {
    title: "Investimentos",
    quota: 0.1
  },
  {
    title: "Despesas de Longo Prazo",
    quota: 0.1
  },
  {
    title: "Instrução",
    quota: 0.1
  },
  {
    title: "Diversão",
    quota: 0.1
  },
  {
    title: "Doação",
    quota: 0.1
  }
]

class Cofrinho {
    constructor(){
        //open connection to database and create object stores (collections) if not created
        this.database = openDB(name, version, {
            //The upgrade callback is the only place where you can create and delete stores.
            upgrade(db){
                collections.forEach(collection => {
                    let store = db.createObjectStore(collection.name, collection.config)
                    //if has index, creates index on store
                    if(collection.indexes)
                        collection.indexes.forEach(index => store.createIndex(`${index}_index`, index))
                })
            },
            blocked: () => {
                // seems an older version of this app is running in another tab
                window.alert(`Please close this app opened in other browser tabs.`);
            },
            blocking: () => {
                // seems the user just opened this app again in a new tab
                // which happens to have gotten a version change
                window.alert(`App is outdated, please close this tab`);
              }
        })

        //create collection CRUD methods
        //retrive account left overs
        this.getLeftOvers = ( limitDateTimestamp ) => {
          
          const keyRange = window.IDBKeyRange.upperBound(limitDateTimestamp)

          return (
            this.database
            .then(( database ) => (
              database
              .getAllFromIndex('expenses', `createdAt_index`, keyRange)
              .then(( expenses ) => (
                database
                .getAllFromIndex('earnings', 'createdAt_index', keyRange)
                .then(( earnings ) => (
                  database
                  .getAll('accounts')
                  .then(( accounts ) => {
                    const accountsLeftOvers = accounts.map(( account ) => {
                      const { quota, id }     = account 
                      const totalEarned       = earnings.reduce(( acc, earning ) => earning.amount + acc, 0 )
                      const accountTotal      = totalEarned * quota
                      const expensesOnAccount = expenses.filter(( expense ) => id === expense.account )
                      const totalSpent        = expensesOnAccount.reduce(( acc, expense ) => acc + expense.amount, 0 )
                      const accountLeftOver   = accountTotal - totalSpent
                      
                      return ({
                        account: account.id,
                        amount: accountLeftOver
                      })
                    });
                    const totalSpent = expenses.reduce(( acc, expense ) => acc + expense.amount, 0);
                    const totalEarned = earnings.reduce(( acc, earning ) => acc + earning.amount, 0);
                    const leftOverTotal = totalEarned - totalSpent;
                    
                    return ({
                      accountsLeftOvers,
                      leftOverTotal,
                      totalEarned,
                      totalSpent
                    });
                  })
                ))
              ))
            ))
            .catch(( e ) => {
              console.error(e)
            })
          )
        }

        //collections default CRUD methods
        collections.forEach(collection => {

            this[collection.name] = {}
            
            // count the total number of items in a store
            this[collection.name].count = () => {
                return this.database.then(database => database.count())
            }

            // retrieve all keys
            this[collection.name].getAllKeys = () => {
                return this.database.then(database => database.getAllKeys(collection.name))
            }

            // retrieve all
            this[collection.name].getAll = () => {
                return this.database.then(database => database.getAll(collection.name))
            }

            // retrieve by key
            this[collection.name].get = (id) => {
                return this.database.then(database => database.get(collection.name, id))
            }

            // add new item
            this[collection.name].post = (value) => {
                return this.database.then(database => database.add(collection.name, value))
            }

            // update/overwrite an item
            this[collection.name].put = (value) => {
                return this.database.then(database => database.put(collection.name, value))
            }
            
            // remove an item
            this[collection.name].delete = (value) => {
                return this.database.then(database => database.delete(collection.name, value))
            }

            //create get methods for each existing index
            if(collection.indexes){
                collection.indexes.forEach((index) => {
                    
                    const capitalizedIndex = index.replace(/^\w/, (c) => c.toUpperCase())
                    
                    //get all items from index's value
                    this[collection.name][`getAllBy${capitalizedIndex}`] = (value) => {
                        return this.database.then(database => {
                            return database.getAllFromIndex(`${index}_index`, index, value)
                        })
                    }
                    
                    //get first item from index's value
                    this[collection.name][`getBy${capitalizedIndex}`] = (value) => {
                        return this.database.then(database => {
                            return database.getFromIndex(`${index}_index`, index, value)
                        })
                    }

                    //get all items from index's range of values
                    this[collection.name][`getAllBy${capitalizedIndex}Range`] = (smaller, bigger) => {
                        return this.database.then(database => {
                            
                            let value = window.IDBKeyRange.bound(smaller, bigger)
                            
                            return database.getAllFromIndex(collection.name, `${index}_index`, value)
                        })
                    }

                    //get all items from index's value and above
                    this[collection.name][`getAllBy${capitalizedIndex}LowerBound`] = (value) => {
                        return this.database.then(database => {

                            value = window.IDBKeyRange.lowerBound(value)
                            
                            return database.getAllFromIndex(collection.name, `${index}_index`, value)
                        })
                    }

                    //get all items from index's value and below
                    this[collection.name][`getAllBy${capitalizedIndex}UpperBound`] = (value) => {
                        return this.database.then(database => {

                            value = window.IDBKeyRange.upperBound(value)
                            
                            return database.getAllFromIndex(collection.name, `${index}_index`, value)
                        })
                    }
                })
            }

            //example retrieve by index
            //  database.getAllFromIndex(shadowCollection, index, value);
            //  database.getFromIndex(shadowCollection, index, value);

            //example retrive by range 
            //Whenever you call .get() or .getAll() with idb, you can always substitute the key with a range, whether that's a primary key or index key. IDBKeyRange is a Browser Native API

            //  const strongRange = IDBKeyRange.smallerBound(8);
            //  const midRange = IDBKeyRange.bound(3, 7);
            //  const weakRange = IDBKeyRange.biggerBound(2);
            //  let [strongCats, ordinaryCats, weakCats] = [
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', strongRange),
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', midRange),
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', weakRange),
            // ];
        })


        //dump database
        this.exportDatabase = () => {
          return this.database.then(database => {
            return new Promise((resolve) => {

              const storeNames = database.objectStoreNames
              
              let exportData = []
              let exportStoreNames = []

              for(const storeName of storeNames){
                exportStoreNames.push(storeName)
                exportData.push(database.getAll(storeName))
              }

              Promise.all(exportData).then(( data ) => {
                exportData = data

                const result = exportData.reduce((acc, storeData, index) => {
                  acc.push({
                    storeName: exportStoreNames[index],
                    data: storeData
                  })
                  
                  return acc
                }, [])

                resolve({
                  DBVersion: database.version,
                  dump: result
                })
              })
            })
          })
        }

        this.importDatabase = (data) => {
          return new Promise((resolve) => {
            this.database.then(database => {
              let promises = []
              data.dump.forEach(( store ) => {
                store.data.forEach(( entry ) => {
                  if(entry.id) delete entry.id
                  promises.push(
                    database.add(store.storeName, entry)
                  )
                })
              })
              Promise.all(promises).then(( result ) => resolve( result ))
            })
          })
        }

        //set initial accounts if there's none
        const collectionName = "accounts"

        this.database.then(database => {
          database.getAll( collectionName )
          .then(( data ) => {
            if( data.length ) return
            initialAccounts.forEach((accountObj) => {
              const account = new AccountModel(accountObj)
              database.add(collectionName, account)
            })
          })
        })
    }
}

export default new Cofrinho()