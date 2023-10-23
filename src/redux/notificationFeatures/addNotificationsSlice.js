import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createNotifications = createAsyncThunk(
  "creationNotifications/postNotifications",
  async (notificationsData, { rejectWithValue }) => {
    try {
      const { data } = await api.addNotification(notificationsData);
      Notiflix.Loading.standard("Création notification en cours...");
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

export const addNotificationsSlice = createSlice({
  name: "creationNotifications",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [createNotifications.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [createNotifications.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createNotifications.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
