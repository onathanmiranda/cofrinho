import { createSlice } from '@reduxjs/toolkit'

import Timeline from '../../models/timeline'

const name = "timeline"

function getRelativeMonthTimeline(current, amount){
  //31 of july becomes 1 of july on previous because theresno 31 june
  const currentDate = new Date(current)
  const newDateTimeStamp = currentDate.setMonth(currentDate.getMonth() + amount)
  return new Timeline(newDateTimeStamp)
}

const timeline = new Timeline()

const initialState = {
  current:  timeline,
  previous: getRelativeMonthTimeline(timeline.timestamp, -1),
  next:     getRelativeMonthTimeline(timeline.timestamp, 1)
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
      goPreviousMonth: (state, action) => {
        const previous = getRelativeMonthTimeline(state.current.timestamp, -2)
        const current  = getRelativeMonthTimeline(state.current.timestamp, -1)
        const next     = state.current

        state = {
          next,
          current,
          previous
        }
      },
      goNextMonth: (state, action) => {
        const previous = state.current
        const current  = getRelativeMonthTimeline(state.current.timestamp, 1)
        const next     = getRelativeMonthTimeline(state.current.timestamp, 2)
        
        state = {
          next,
          current,
          previous
        }
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