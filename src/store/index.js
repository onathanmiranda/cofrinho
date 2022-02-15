import { configureStore } from "@reduxjs/toolkit";

import { reducer as accounts } from "./slices/accounts";
import { reducer as earnings } from "./slices/earnings";
import { reducer as expenses } from "./slices/expenses";
import { reducer as timeline } from "./slices/timeline";
import { reducer as user } from "./slices/user";
import { reducer as leftovers } from "./slices/leftovers";
import { reducer as modal } from "./slices/modal";

export default configureStore({
  reducer: {
    accounts,
    earnings,
    expenses,
    leftovers,
    timeline,
    user,
    modal,
  },
  devTools: true,
});
