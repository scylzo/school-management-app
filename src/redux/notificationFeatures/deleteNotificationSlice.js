import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteNotification = createAsyncThunk(
  "deletingNotification/deleteNotification",
  async (notifData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteNotification(notifData);
      Notiflix.Loading.standard(" Suppression en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const deleteNotificationSlice = createSlice({
  name: "deletingNotification",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteNotification.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteNotification.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteNotification.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
