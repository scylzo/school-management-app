import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchAdmissionById = createAsyncThunk(
  "admissionById/getAdmissionById",
  async (studentId) => {
    try {
      const { data } = await api.getStudentAdmissionById(studentId);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const admissionByIdSlice = createSlice({
  name: "admissionById",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchAdmissionById.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchAdmissionById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchAdmissionById.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
