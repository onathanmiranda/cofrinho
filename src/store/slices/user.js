import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho from '../../apis/cofrinho';

const name = "user"

const initialState = {
    data: false,
    requesting: false,
    error: false,
    hasRegisteredOnce: Boolean(localStorage.getItem('hasRegisteredOnce'))
}

const getUser = createAsyncThunk(`${name}/getUser`,
    (payload, thunkAPI) => {
        return Promise.reject('')
    }
)

const postUser = createAsyncThunk(`${name}/postUser`,
    (payload, thunkAPI) => (
        Cofrinho.user.post(payload)
        .then(({ data }) => data)
        .catch((e) => thunkAPI.rejectWithValue(e))
    )
)

const login = createAsyncThunk(`${name}/login`,
    (payload, thunkAPI) => (
        Cofrinho.user.login(payload)
        .then(({ data }) => data)
        .catch((e) => {console.log('onThunk', e); return thunkAPI.rejectWithValue(e)})
    )
)

const slice = createSlice({
  name,
  initialState,
  reducers: {
      cleanUpErrors: (state) => {
          state.error = false
      }
  },
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
            localStorage.setItem('hasRegisteredOnce', true);
        },
        [ postUser.pending ]: ( state, action ) => { 
            state.requesting = true 
        },
        [ postUser.rejected ]: ( state, action ) => {
            state.requesting = false
            state.error = action.payload
        },
        [ login.fulfilled ]: ( state, action ) => {
            state.requesting = false
            state.data = action.payload
            localStorage.setItem('hasRegisteredOnce', true);
        },
        [ login.pending ]: ( state, action ) => { 
            state.requesting = true 
        },
        [ login.rejected ]: ( state, action ) => {
            console.log('onRejected', action.payload)
            state.requesting = false
            state.error = action.payload
        },
  }
})
export { getUser, postUser, login }
export const { cleanUpErrors } = slice.actions
export const { reducer } = slice
