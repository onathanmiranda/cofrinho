import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "earnings"

const initialState = {
    items: []
}

const getEarnings = createAsyncThunk(`${name}/getEarnings`, 
  (payload, thunkAPI) => {
    
    const { timeline }        = thunkAPI.getState()
    const firstDayOfTheMonth  = timeline.month.firstDay
    const lastDayOfTheMonth   = timeline.month.lastDay

    return Cofrinho.earnings.getAllByCreatedAtRange(firstDayOfTheMonth, lastDayOfTheMonth).then((data) => {
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