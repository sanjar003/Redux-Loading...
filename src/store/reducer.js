import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =
  "https://api.elchocrud.pro/api/v1/03e5f05539a14f1902e9418ffda7f47d/Loading";

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postTodo = createAsyncThunk("todo/postTodo", async (newTodo) => {
  try {
    const response = await axios.post(URL, newTodo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    addTodo: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        console.log("pending", action);
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log("fullfilled", action);

        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log("rejected", action);

        state.error = action.error.message;
      })
      .addCase(postTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
