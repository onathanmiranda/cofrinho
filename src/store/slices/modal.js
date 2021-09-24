import { createSlice } from '@reduxjs/toolkit'

const name = "modal"

const initialState = {
  formCreateExpense: {
    show: false,
    accountID: undefined
  },
  formEarning: {
    show: false,
    earningID: undefined
  },
  formEditExpense: {
    show: false,
    expenseID: undefined
  }
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setFormCreateExpense: (state, action) => {
      state.formCreateExpense.show      = action.payload.show      || state.formCreateExpense.show
      state.formCreateExpense.accountID = action.payload.accountID || state.formCreateExpense.accountID
    },
    hideFormCreateExpense: (state) => { state.formCreateExpense = initialState.formCreateExpense }, 
    setFormEarning: (state, action) => { 
      console.log(action.payload)
      state.formEarning.show      = action.payload.show      || state.formEarning.show
      state.formEarning.earningID = action.payload.earningID || state.formEarning.earningID
    }, 
    hideFormEarning: (state) => { state.formEarning = initialState.formEarning } 
  },
  extraReducers: {}
})

export const { 
  setFormCreateExpense, 
  hideFormCreateExpense,
  setFormEarning,
  hideFormEarning,
} = slice.actions

export const { reducer } = slice