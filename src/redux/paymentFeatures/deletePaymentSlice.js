import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deletePayment = createAsyncThunk(
  "deletingPayment/deletePayment",
  async (notifData, { rejectWithValue }) => {
    try {
      const { data } = await api.deletePayment(notifData);
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

export const deletePaymentSlice = createSlice({
  name: "deletingPayment",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deletePayment.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deletePayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deletePayment.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
