import { createSlice } from '@reduxjs/toolkit'

import Timeline from '../../models/timeline'

const name = "timeline"

const initialState = new Timeline()

const slice = createSlice({
  name,
  initialState,
  reducers: {
    goPreviousMonth: (state) => {
      const { current, next, previous } = new Timeline(state.previous.timestamp)
      state.current   = current
      state.previous  = previous
      state.next      = next
    },
    goNextMonth: (state) => {
      const { current, next, previous } = new Timeline(state.next.timestamp)
      state.current   = current
      state.previous  = previous
      state.next      = next
    },
    goPreviousYear: (state, action) => {
      const currentDate = new Date(state.timestamp)
      const newDateTimeStamp = currentDate.setFullYear(currentDate.getFullYear() - 1).getTime()
      state.current = new Timeline(newDateTimeStamp)
    },
    goNextYear: (state, action) => {
      const currentDate = new Date(state.timestamp)
      const newDateTimeStamp = currentDate.setFullYear(currentDate.getFullYear() + 1).getTime()
      state.current = new Timeline(newDateTimeStamp)
    }
  },
})

export const { reducer } = slice

export const {
  goNextMonth,
  goPreviousMonth,
  goNextYear,
  goPreviousYear
} = slice.actions