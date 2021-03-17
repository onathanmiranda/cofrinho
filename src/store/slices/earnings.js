import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "earnings"

const initialState = {
    items: []
}

const getEarnings = createAsyncThunk(`${name}/getEarnings`, 
  (payload, thunkAPI) => {
    return Cofrinho.earnings.getAll().then((data) => {
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

export { getEarnings }

export const { reducer } = slice