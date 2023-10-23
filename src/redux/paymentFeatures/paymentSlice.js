import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchpayment = createAsyncThunk("payment/getpayment", async () => {
  try {
    const { data } = await api.getAllPaiements();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchpayment.pending]: (state) => {
      state.loading = true;
    },
    [fetchpayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchpayment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
