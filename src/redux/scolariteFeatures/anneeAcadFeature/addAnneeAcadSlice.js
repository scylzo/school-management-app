import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createAnneeAcad = createAsyncThunk(
  "creationAnneeAcad/postAnneeAcad",
  async (anneeAcadData, { rejectWithValue }) => {
    try {
      const { data } = await api.addAnneeAcademique(anneeAcadData);
      Notiflix.Loading.standard("Création Année Académique en cours...");
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

export const createAnneeAcadSlice = createSlice({
  name: "creationAnneeAcad",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [createAnneeAcad.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [createAnneeAcad.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createAnneeAcad.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
