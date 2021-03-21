import { createSlice } from '@reduxjs/toolkit'

import Timeline from '../../models/timeline'

const name = "timeline"

const initialState = new Timeline()

const slice = createSlice({
  name,
  initialState,
  reducers: {
      goPreviousMonth: (state, action) => {
        const currentDate = new Date(state.timestamp)
        const newDateTimeStamp = currentDate.setMonth(currentDate.getMonth() - 1).getTime()
        state.current = new Timeline(newDateTimeStamp)
      },
      goNextMonth: (state, action) => {
        const currentDate = new Date(state.timestamp)
        const newDateTimeStamp = currentDate.setMonth(currentDate.getMonth() + 1).getTime()
        state.current = new Timeline(newDateTimeStamp)
      },
      goToPreviousYear: (state, action) => {
        const currentDate = new Date(state.timestamp)
        const newDateTimeStamp = currentDate.setFullYear(currentDate.getFullYear() - 1).getTime()
        state.current = new Timeline(newDateTimeStamp)
      },
      goToNextYear: (state, action) => {
        const currentDate = new Date(state.timestamp)
        const newDateTimeStamp = currentDate.setFullYear(currentDate.getFullYear() + 1).getTime()
        state.current = new Timeline(newDateTimeStamp)
      }
  },
})

export const { reducer } = slice