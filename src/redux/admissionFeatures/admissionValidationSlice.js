import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const validateAdmission = createAsyncThunk(
  "validationAdmission/validationStudentAdmission",
  async (validationData, { rejectWithValue }) => {
    try {
      const { data } = await api.validateStudentAdmission(validationData);
      Notiflix.Loading.standard("Traitement en cours...");
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

export const admissionValidationSlice = createSlice({
  name: "validationAdmission",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [validateAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [validateAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [validateAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
