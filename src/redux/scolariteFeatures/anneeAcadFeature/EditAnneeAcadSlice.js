import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editAnneeAcad = createAsyncThunk(
  "editAnneeAcad/putAnneeAcad",
  async (anneeAcadData, { rejectWithValue }) => {
    try {
      const { data } = await api.editAnneeAcademique(anneeAcadData);
      Notiflix.Loading.standard("Edition Année Académique en cours...");
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

export const editAnneeAcadSlice = createSlice({
  name: "editAnneeAcad",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editAnneeAcad.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editAnneeAcad.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editAnneeAcad.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
