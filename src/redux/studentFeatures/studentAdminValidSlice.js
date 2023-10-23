import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchStudentsWithAdminValid = createAsyncThunk(
  "students/getStudentsAdminValid",
  async () => {
    try {
      const { data } = await api.getAllStudentWithAdminValidated();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const studentWithAdminValidSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchStudentsWithAdminValid.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchStudentsWithAdminValid.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchStudentsWithAdminValid.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
