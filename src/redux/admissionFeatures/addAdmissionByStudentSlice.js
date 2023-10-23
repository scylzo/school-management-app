import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addStudentAdmission = createAsyncThunk(
  "addStudentAdmissions/postStudentAdmissions",
  async (admissionData, { rejectWithValue }) => {
    try {
      const { data } = await api.addStudentAdmission(admissionData);
      Notiflix.Loading.standard("Admission en cours...");
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

export const addAdmissionStudentSlice = createSlice({
  name: "addStudentAdmissions",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addStudentAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addStudentAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addStudentAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
