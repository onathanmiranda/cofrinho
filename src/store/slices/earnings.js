import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "earnings"

const initialState = {
    items: [],
    totalEarned: 0
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
  extraReducers: {
    [getEarnings.fulfilled]: ( state, action ) => {
        
        const earnings = action.payload

        const totalEarned = earnings.reduce((accumulator, expense) => { 
            return accumulator + expense.value
        }, 0)

        state.items = [ ...earnings ]
        state.totalEarned = totalEarned
    },
    [getEarnings.pending]: ( state, action ) => {
    },
    [getEarnings.rejected]: ( state, action ) => {
        console.log(action.error)
    },
  }
})

export { getEarnings }

export const { reducer } = slice