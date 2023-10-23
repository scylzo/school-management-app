import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchStudents = createAsyncThunk(
  "student/getStudents",
  async () => {
    try {
      const { data } = await api.getAllStudent();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchStudents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchStudents.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
