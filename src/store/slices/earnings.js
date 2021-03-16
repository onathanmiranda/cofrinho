import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "earnings"

const initialState = {
    items: []
}

const slice = createSlice({
  name,
  initialState,
  reducers: {},
})

export const { reducer } = slice