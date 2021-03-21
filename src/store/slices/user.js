import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cofrinho  from '../../apis/cofrinho'
import UserModel from '../../models/user'

const name = "user"

const initialState = {
    data: false,
    requesting: true
}

const getUser = createAsyncThunk(`${name}/getUser`,
    (payload, thunkAPI) => {
        return Cofrinho.user.get(1)
    }
)

const postUser = createAsyncThunk(`${name}/registerUser`,
    (payload, thunkAPI) => {
        const user  = new UserModel(payload)
        return Cofrinho.user.post(user).then(( id ) => Cofrinho.user.get( id ))
    }
)

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
        [ getUser.fulfilled ]: ( state, action ) => {
            state.requesting = false 
            state.data = action.payload
        },
        [ getUser.pending ]: ( state, action ) => { 
            state.requesting = true 
        },
        [ getUser.rejected ]: ( state, action ) => { 
            state.requesting = false
        },
        [ postUser.fulfilled ]: ( state, action ) => {
            state.requesting = false
            state.data = action.payload
        },
        [ postUser.pending ]: ( state, action ) => { 
            state.requesting = true 
        },
        [ postUser.rejected ]: ( state, action ) => { 
            state.requesting = false
        },
  }
})

export { getUser, postUser }

export const { reducer } = slice
