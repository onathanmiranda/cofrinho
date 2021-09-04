import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho from '../../apis/cofrinho'

const name = "leftovers"

const initialState = {
    items: [],
    totalLeftOver: 0,
    requesting: false
}

const getLeftOvers = createAsyncThunk(`${name}/getLeftOvers`, 
  (params, thunkAPI) => {
    
    const timestamp = thunkAPI.getState().timeline.previous.month.lastDay

    return Cofrinho.getLeftOvers(timestamp)
    .then((data) => {
      return data
    })
    .catch((e) => {
      return e
    })
  }
)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getLeftOvers.fulfilled]: (state, action) => {
      state.requesting    = false
      state.items         = action.payload.accountsLeftOvers
      state.totalLeftOver = action.payload.leftOverTotal
    },
    [getLeftOvers.pending]: (state, action) => {
      state.requesting = true
    },
    [getLeftOvers.rejected]: (state, action) => {
      state.requesting = false
    }
  }
})

export { getLeftOvers }
export const { reducer } = slice
