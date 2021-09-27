import Cofrinho from '../apis/cofrinho'

export const exportData = async () => await Cofrinho.exportDatabase()
export const importData = async (data) => await Cofrinho.importDatabase()