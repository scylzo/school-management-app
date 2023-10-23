import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editPayment = createAsyncThunk(
  "editPayment/putPayment",
  async (PaymentData, { rejectWithValue }) => {
    try {
      const { data } = await api.editPaiement(PaymentData);
      Notiflix.Loading.standard("edition paiement en cours...");
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

export const editPaymentSlice = createSlice({
  name: "editPayment",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editPayment.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editPayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editPayment.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
