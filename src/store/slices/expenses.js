import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cofrinho from "../../apis/cofrinho-indexedDB";
import ExpenseModel from "../../models/expense";

const name = "expenses";

const initialState = {
  items: [],
  totalSpent: 0,
  requesting: false,
};

const getExpenses = createAsyncThunk(
  `${name}/getExpenses`,
  (payload, thunkAPI) => {
    const { timeline } = thunkAPI.getState();
    const firstDayOfTheMonth = timeline.current.month.firstDay;
    const lastDayOfTheMonth = timeline.current.month.lastDay;

    //return all expenses for current month
    return Cofrinho.expenses
      .getAllByCreatedAtRange(firstDayOfTheMonth, lastDayOfTheMonth)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }
);

const createExpense = createAsyncThunk(
  `${name}/createExpense`,
  (payload, thunkAPI) => {
    const { title, amount, account } = payload;
    const createdAt = thunkAPI.getState().timeline.current.timestamp;

    return Cofrinho.expenses
      .post(new ExpenseModel({ title, amount, account, createdAt }))
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }
);

const deleteExpense = createAsyncThunk(
  `${name}/deleteExpense`,
  (payload, thunkAPI) => {
    const id = payload;

    return Cofrinho.expenses
      .delete(id)
      .then((data) => {
        return id;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }
);

const getTotalSpent = (expenses) =>
  expenses.reduce((accumulator, expense) => {
    return accumulator + expense.amount;
  }, 0);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getExpenses.fulfilled]: (state, action) => {
      state.requesting = false;
      state.items = action.payload;
      state.totalSpent = getTotalSpent(action.payload);
    },
    [getExpenses.pending]: (state, action) => {
      state.requesting = true;
    },
    [getExpenses.rejected]: (state, action) => {
      state.requesting = false;
      console.log(action.error.message);
    },
    [createExpense.fulfilled]: (state, action) => {
      state.requesting = false;
    },
    [createExpense.pending]: (state, action) => {
      state.requesting = true;
    },
    [createExpense.rejected]: (state, action) => {
      state.requesting = false;
      console.log(action.error.message);
    },
    [deleteExpense.fulfilled]: (state, action) => {
      state.requesting = false;
      const updatedItems = state.items.filter(
        ({ id }) => id !== action.payload
      );
      state.items = updatedItems;
      state.totalSpent = getTotalSpent(updatedItems);
    },
    [deleteExpense.pending]: (state, action) => {
      state.requesting = true;
    },
    [deleteExpense.rejected]: (state, action) => {
      state.requesting = false;
    },
  },
});

export { getExpenses, createExpense, deleteExpense };

export const { reducer } = slice;
