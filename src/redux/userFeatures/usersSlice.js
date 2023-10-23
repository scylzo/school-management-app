import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const { data } = await api.getAllUser();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
