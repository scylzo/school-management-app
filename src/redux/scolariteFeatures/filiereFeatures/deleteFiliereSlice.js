import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteFiliere = createAsyncThunk(
  "deletingFiliere/postFiliere",
  async (filiereData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteFiliere(filiereData);
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

export const deleteFiliereSlice = createSlice({
  name: "deletingFiliere",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteFiliere.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteFiliere.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteFiliere.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
