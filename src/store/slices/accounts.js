import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Cofrinho from '../../apis/cofrinho'

import AccountModel from '../../models/account'

const name = "accounts"

const initialAccounts = [
  {
    title: "Despesas Básicas",
    quota: 0.5
  },
  {
    title: "Investimento",
    quota: 0.1
  },
  {
    title: "Despesas de Longo Prazo",
    quota: 0.1
  },
  {
    title: "Instrução",
    quota: 0.1
  },
  {
    title: "Diversão",
    quota: 0.1
  },
  {
    title: "Doação",
    quota: 0.1
  }
]

const initialState = {
    items: [],
    requesting: false
}

const getAccounts = createAsyncThunk(`${name}/getAccounts`, 
  (payload, thunkAPI) => {
    return Cofrinho.accounts.getAll().then((data) => {
      if(data.length) {
        //if accounts are already set, return accounts
        return data
      } else {
        //else, set initial accounts
        return Promise.all( initialAccounts.map((account) => {
          return Cofrinho.accounts.post(new AccountModel(account))
        })).then(() => {
          return Cofrinho.accounts.getAll()
        })
      }
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
