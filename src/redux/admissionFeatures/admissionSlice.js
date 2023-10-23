import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchAdmission = createAsyncThunk(
  "admission/getAdmissions",
  async () => {
    try {
      const { data } = await api.getAllAdmission();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
