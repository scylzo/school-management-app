import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addPayment = createAsyncThunk(
  "addingPayment/postPayment",
  async (PaymentData, { rejectWithValue }) => {
    try {
      const { data } = await api.addPayment(PaymentData);
      Notiflix.Loading.standard("validation paiement en cours...");
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

export const addPaymentSlice = createSlice({
  name: "addingPayment",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addPayment.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addPayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addPayment.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
