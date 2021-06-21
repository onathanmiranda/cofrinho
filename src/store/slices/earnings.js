import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho     from '../../apis/cofrinho'
import EarningModel from '../../models/earning'

const name = "earnings"

const initialState = {
    items: [],
    totalEarned: 0
}

const getEarnings = createAsyncThunk(`${name}/getEarnings`, 
  ( payload, thunkAPI ) => {
  
    const { timeline }        = thunkAPI.getState()
    const firstDayOfTheMonth  = timeline.month.firstDay
    const lastDayOfTheMonth   = timeline.month.lastDay
    
    return Cofrinho.earnings
    .getAllByCreatedAtRange(firstDayOfTheMonth, lastDayOfTheMonth)
    .then((data) => {
      return data
    }).catch((e) => {
      console.log(e)
      return e
    })
  }
)

const createEarning = createAsyncThunk(`${name}/createEarnings`,
  ( payload ) => {
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

const updateEarning = createAsyncThunk(`${name}/updateEarning`, 
  ( payload ) => {

    const earning = new EarningModel(payload)
    
    return (
      Cofrinho.earnings
      .put(payload)
      .then((data) => {
        return earning
      })
      .catch((e) => {
        console.log(e)
        return e
      })
    )
  }
)

const deleteEarning = createAsyncThunk(`${name}/deleteEarning`,
  ( payload ) => {
      
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

const getTotalEarned = (earnings) => earnings.reduce((accumulator, earning) => { 
  return accumulator + earning.amount
}, 0)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getEarnings.fulfilled]: ( state, action ) => {
        
      const earnings = action.payload

      const totalEarned = getTotalEarned(earnings)

      state.items = [ ...earnings ]
      state.totalEarned = totalEarned
    },
    [getEarnings.rejected]: ( state, action ) => {
      console.log(action.error)
    },
    [createEarning.fulfilled]: ( state, action ) => {
      state.items.push(action.payload)
      state.totalEarned = state.totalEarned + action.payload.amount
    },
    [createEarning.rejected]: ( state, action ) => {
        console.log(action.error)
    },
    [updateEarning.fulfilled]: (state, action) => {
      const { id } = action.payload
      state.items = [
        ...state.items.filter((item) => item.id !== id),
        action.payload
      ]
      state.totalEarned = getTotalEarned(state.items)
    },
    [updateEarning.rejected]: (state, action) => {
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

export { getEarnings, createEarning, deleteEarning, updateEarning }

export const { reducer } = slice