import { configureStore } from '@reduxjs/toolkit'

import { reducer as expenses } from './slices/expenses'
import { reducer as earnings } from './slices/earnings'
import { reducer as accounts } from './slices/accounts'
import { reducer as user }     from './slices/user'

export default configureStore({
  reducer: {
    expenses,
    earnings,
    accounts,
    user
  },
  devTools: true,
})