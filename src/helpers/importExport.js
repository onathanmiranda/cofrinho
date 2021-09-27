import Cofrinho from '../apis/cofrinho'

async function exportData(){
  const data = await Cofrinho.exportDatabase()
  console.log(data)
}

exportData()