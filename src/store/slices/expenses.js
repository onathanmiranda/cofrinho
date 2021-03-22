import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "expenses"

const initialState = {
    items: [],
    requesting: false
}

const getExpenses = createAsyncThunk(`${name}/getExpenses`, 
  (payload, thunkAPI) => {

    const { timeline }        = thunkAPI.getState()
    const firstDayOfTheMonth  = timeline.month.firstDay
    const lastDayOfTheMonth   = timeline.month.lastDay

    //return all expenses for current month
    return Cofrinho.expenses.getAllByCreatedAtRange(firstDayOfTheMonth, lastDayOfTheMonth).then((data) => {
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
  extraReducers: {
    [getExpenses.fulfilled]: (state, action) => {
      state.requesting = false
      state.items = action.payload
    },
    [getExpenses.pending]: (state, action) => {
      state.requesting = true
    },
    [getExpenses.rejected]: (state, action) => {
      state.requesting = false
      console.log(action.error.message)
    }
  }
})

export { getExpenses }
export const { reducer } = slice
