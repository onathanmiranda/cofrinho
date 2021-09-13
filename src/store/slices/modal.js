import { createSlice } from '@reduxjs/toolkit'

const name = "modal"

const initialState = {
  formCreateExpense: {
    show: false,
    accountID: undefined
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
    hideFormCreateExpense: (state) => {
      state.formCreateExpense = initialState.formCreateExpense
    }
  },
  extraReducers: {}
})

export const { setFormCreateExpense, hideFormCreateExpense } = slice.actions
export const { reducer } = slice
