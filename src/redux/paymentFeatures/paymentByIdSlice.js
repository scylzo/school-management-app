import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchpaymentById = createAsyncThunk(
  "paymentById/getpaymentById",
  async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await api.getStudentPaymentById(studentId);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const paymentByIdSlice = createSlice({
  name: "paymentById",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchpaymentById.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchpaymentById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchpaymentById.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
