import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteAnneeAcad = createAsyncThunk(
  "deletingAnneeAcad/deleteAnneeAcad",
  async (anneeAcadData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteAnneeAcademique(anneeAcadData);
      Notiflix.Loading.standard(" Suppression en cours...");
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

export const deleteAnneeAcadSlice = createSlice({
  name: "deletingAnneeAcad",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteAnneeAcad.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteAnneeAcad.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteAnneeAcad.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
