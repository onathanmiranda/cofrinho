//Uses Browsers IndexedDB as Database
//https://hackernoon.com/use-indexeddb-with-idb-a-1kb-library-that-makes-it-easy-8p1f3yqq

import { openDB } from 'idb'

const name = 'cofrinho' //database name
const version = 1 //database version

const collectionsDefaultConfigs = {
    keyPath: "id", //defines entity identification
    autoIncrement: true //This object store can only hold JavaScript objects. Usually a key is generated and the value of the generated key is stored in the object in a property with the same name as the key path. However, if such a property already exists, the value of that property is used as key rather than generating a new key.
}

const collections = [
    { 
        name: "accounts", 
        config: { ...collectionsDefaultConfigs }
    },
    {
        name: "earnings",
        config: { ...collectionsDefaultConfigs }
    },
    {
        name: "expenses",
        config: { ...collectionsDefaultConfigs }
    },
    { 
        name: "user", 
        config: { ...collectionsDefaultConfigs }
    }
]

class Cofrinho {
    constructor(){
        //open connection to database and create object stores (collections) if not created
        this.database = openDB(name, version, {
            //The upgrade callback is the only place where you can create and delete stores.
            upgrade(db){
                collections.forEach(collection => {
                    db.createObjectStore(collection.name, collection.config)
                    //const store = db.createObjectStore(collection.name, collection.config)
                    //store.createIndex('strengthIndex', 'strength');
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
        //ex: db.collection.getAll()
        collections.forEach(collection => {

            this[collection.name] = {}
            
            // count the total number of items in a store
            this[collection.name].count = () => {
                return this.database.then(database => database.count())
            }

            // get all keys
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

            //example retrieve by index
            //  database.getAllFromIndex(shadowCollection, index, value);
            //  database.getFromIndex(shadowCollection, index, value);

            //example retrive by range 
            //Whenever you call .get() or .getAll() with idb, you can always substitute the key with a range, whether that's a primary key or index key. IDBKeyRange is a Browser Native API

            //  const strongRange = IDBKeyRange.lowerBound(8);
            //  const midRange = IDBKeyRange.bound(3, 7);
            //  const weakRange = IDBKeyRange.upperBound(2);
            //  let [strongCats, ordinaryCats, weakCats] = [
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', strongRange),
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', midRange),
                //  await db3.getAllFromIndex('moreCats', 'strengthIndex', weakRange),
            // ];
        })
    }
}

export default new Cofrinho()