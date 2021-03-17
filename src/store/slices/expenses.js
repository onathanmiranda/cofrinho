import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "expenses"

const initialState = {
    items: []
}

const getExpenses = createAsyncThunk(`${name}/getExpenses`, 
  (payload, thunkAPI) => {
    return Cofrinho.expenses.getAll().then((data) => {
      return data
    }).catch((e) => {
      console.log(e)
      return e
    })
  }
)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
})

export { getExpenses }
export const { reducer } = slice
