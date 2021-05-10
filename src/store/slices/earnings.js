import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho     from '../../apis/cofrinho'
import EarningModel from '../../models/earning'

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

const createEarning = createAsyncThunk(`${name}/createEarnings`,
    ( payload, thunkAPI ) => {
        const earning = new EarningModel(payload)

        return ( 
            Cofrinho.earnings
            .post(earning)
            .then((data) => {
                return Cofrinho.earnings.get(data)
            })
            .catch((e) => {
                console.log(e)
                return e
            })
        )
    }
)

const deleteEarning = createAsyncThunk(`${name}/deleteEarning`,
    ( payload, thunkAPI ) => {
        
        const id = payload
        
        return ( 
            Cofrinho.earnings
            .delete(id)
            .then((data) => {
                return id
            })
            .catch((e) => {
                console.log(e)
                return e
            })
        )
    }
)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getEarnings.fulfilled]: ( state, action ) => {
        
        const earnings = action.payload

        const totalEarned = earnings.reduce((accumulator, earning) => { 
            return accumulator + earning.amount
        }, 0)

        state.items = [ ...earnings ]
        state.totalEarned = totalEarned
    },
    [getEarnings.pending]: ( state, action ) => {
    },
    [getEarnings.rejected]: ( state, action ) => {
        console.log(action.error)
    },
    [createEarning.fulfilled]: ( state, action ) => {
        state.items.push(action.payload)
        state.totalEarned = state.totalEarned + action.payload.amount
    },
    [createEarning.pending]: ( state, action ) => {
        
    },
    [createEarning.rejected]: ( state, action ) => {
        console.log(action.error)
    },
    [deleteEarning.fulfilled]: ( state, action ) => {
        const updatedItems = state.items.filter( earning => earning.id !== action.payload )
        
        const totalEarned = updatedItems.reduce((accumulator, earning) => { 
            return accumulator + earning.amount
        }, 0)

        state.items = [ ...updatedItems ]
        state.totalEarned = totalEarned
    },
    [deleteEarning.pending]: ( state, action ) => {
        
    },
    [deleteEarning.rejected]: ( state, action ) => {
        console.log( action.error )
    },
  }
})

export { getEarnings, createEarning, deleteEarning }

export const { reducer } = slice