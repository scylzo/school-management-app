import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editNotification = createAsyncThunk(
  "editNotification/putNotification",
  async (notifData, { rejectWithValue }) => {
    try {
      const { data } = await api.editNotification(notifData);
      Notiflix.Loading.standard("mis à jour en cours...");
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

export const editNotificationSlice = createSlice({
  name: "editNotification",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editNotification.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editNotification.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editNotification.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
