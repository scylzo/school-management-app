import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchAnneeAcad = createAsyncThunk(
  "anneeAcad/getAnneeAcad",
  async () => {
    try {
      const { data } = await api.getAllAnneeAcad();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const anneeAcadSlice = createSlice({
  name: "anneeAcad",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchAnneeAcad.pending]: (state) => {
      state.loading = true;
    },
    [fetchAnneeAcad.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchAnneeAcad.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
