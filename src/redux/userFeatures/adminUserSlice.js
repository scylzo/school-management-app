import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchadminUsers = createAsyncThunk(
  "adminUser/getadminUsers",
  async () => {
    try {
      const { data } = await api.getAllAdministrateurs();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const adminUsersSlice = createSlice({
  name: "adminUser",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchadminUsers.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchadminUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchadminUsers.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
