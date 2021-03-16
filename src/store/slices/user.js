import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho from '../../apis/cofrinho'

const name = "user"

const initialState = {
    data: false,
    request: 'idle'
}

const getUser = createAsyncThunk(`${name}/getUser`,
    (payload, thunkAPI) => {
        return Cofrinho.user.get(1)
    }
)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
        [ getUser.fulfilled ]: ( state, action ) => {
            state.request = "idle" 
            console.log( action.payload )
        },
        [ getUser.pending ]: ( state, action ) => { 
            state.request = "pending" 
            console.log( action.payload )
        },
        [ getUser.rejected ]: ( state, action ) => { 
            state.request = "idle"
            console.log( action.payload )
        },
  }
})

export { getUser }
export const { reducer } = slice
