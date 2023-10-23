import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createAdmission = createAsyncThunk(
  "creationAdmissions/postAdmissions",
  async (admissionData, { rejectWithValue }) => {
    try {
      const { data } = await api.createAdmission(admissionData);
      Notiflix.Loading.standard("Création admission en cours...");
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

export const createAdmissionsSlice = createSlice({
  name: "creationAdmissions",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [createAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [createAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
