import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho from '../../apis/cofrinho'

const name = "accounts"

const initialState = {
    items: [],
    requesting: false
}

const getAccounts = createAsyncThunk(`${name}/getAccounts`, 
  () => {
    return Cofrinho.accounts.getAll()
    .then((data) => {
      return data
    })
    .catch((e) => {
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
    [getAccounts.fulfilled]: (state, action) => {
      state.requesting = false
      state.items = action.payload
    },
    [getAccounts.pending]: (state, action) => {
      state.requesting = true
    },
    [getAccounts.rejected]: (state, action) => {
      state.requesting = false
      console.log(action.error)
    }
  }
})

export { getAccounts }
export const { reducer } = slice
