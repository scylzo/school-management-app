import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editAdmission = createAsyncThunk(
  "editionAdmission/putAdmissions",
  async (editAdmissionData, { rejectWithValue }) => {
    try {
      const { data } = await api.editAdmission(editAdmissionData);
      Notiflix.Loading.standard("Mise à jour admission en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const admissionEditionSlice = createSlice({
  name: "editionAdmission",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
