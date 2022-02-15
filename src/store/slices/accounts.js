import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Cofrinho from "../../apis/cofrinho";
import Account from "../../models/account";

const name = "accounts";

const initialState = {
  items: [],
  requesting: false,
};

const getAccounts = createAsyncThunk(
  `${name}/getAccounts`,
  (payload, thunkAPI) => {
    const { token } = thunkAPI.getState().user.data;

    return Cofrinho.accounts
      .getAll({ token })
      .then(({ data }) => data)
      .catch((e) => thunkAPI.rejectWithValue(e));
  }
);

const updateAccount = createAsyncThunk(`${name}/updateAccount`, (payload) => {
  const account = new Account(payload);
  return Cofrinho.accounts
    .put(account)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e;
    });
});

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      state.requesting = false;
      state.items = action.payload;
    });
    builder.addCase(getAccounts.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(getAccounts.rejected, (state, action) => {
      state.requesting = false;
      console.log(action.error);
    });
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      state.requesting = false;
      console.log(action.payload);
    });
    builder.addCase(updateAccount.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(updateAccount.rejected, (state, action) => {
      state.requesting = false;
      console.log(action.error);
    });
  },
});

export { getAccounts, updateAccount };
export const { reducer } = slice;
