import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const archiveAdmission = createAsyncThunk(
  "archivageAdmission/archiveAdmission",
  async (admissionId, { rejectWithValue }) => {
    try {
      const { data } = await api.archiveAdmission(admissionId);
      Notiflix.Loading.standard("archivage admission en cours...");
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

export const archiveAdmissionsSlice = createSlice({
  name: "archivageAdmission",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [archiveAdmission.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [archiveAdmission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [archiveAdmission.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
