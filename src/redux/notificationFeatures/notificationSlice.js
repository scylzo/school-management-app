import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    try {
      const { data } = await api.getAllNotifications();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchNotifications.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchNotifications.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
