import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho from '../../apis/cofrinho'

const name = "leftovers"

const initialState = {
    items: [],
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
      state.requesting = false
      state.items = action.payload
    },
    [getLeftOvers.pending]: (state, action) => {
      state.requesting = true
    },
    [getLeftOvers.rejected]: (state, action) => {
      state.requesting = false
      console.log(action.error)
    }
  }
})

export { getLeftOvers }
export const { reducer } = slice
