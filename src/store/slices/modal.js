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
  },
  formManageAccounts: {
    show: false
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
      state.formEarning.show      = action.payload.show      || state.formEarning.show
      state.formEarning.earningID = action.payload.earningID || state.formEarning.earningID
    }, 
    hideFormEarning: (state) => { state.formEarning = initialState.formEarning },
    setFormManageAccounts: (state, action) => { 
      state.formManageAccounts.show = action.payload.show || state.formManageAccounts.show 
    },
    hideFormManageAccounts: (state) => { state.formManageAccounts = initialState.formManageAccounts }
  },
  extraReducers: {}
})

export const { 
  setFormCreateExpense, 
  hideFormCreateExpense,
  setFormEarning,
  hideFormEarning,
  setFormManageAccounts,
  hideFormManageAccounts
} = slice.actions

export const { reducer } = slice