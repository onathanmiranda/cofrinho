import { configureStore } from '@reduxjs/toolkit'

import { reducer as accounts }  from './slices/accounts'
import { reducer as earnings }  from './slices/earnings'
import { reducer as expenses }  from './slices/expenses'
import { reducer as timeline }  from './slices/timeline'
import { reducer as user }      from './slices/user'
import { reducer as leftovers } from './slices/leftovers'

export default configureStore({
  reducer: {
    accounts,
    earnings,
    expenses,
    timeline,
    user,
    leftovers,
  },
  devTools: true,
})