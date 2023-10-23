import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchFiliere = createAsyncThunk("filiere/getFiliere", async () => {
  try {
    const { data } = await api.getAllFiliere();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const filiereSlice = createSlice({
  name: "filiere",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchFiliere.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchFiliere.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchFiliere.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
