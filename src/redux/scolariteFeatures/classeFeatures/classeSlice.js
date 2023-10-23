import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchClasse = createAsyncThunk("classe/getClasse", async () => {
  try {
    const { data } = await api.getAllClasse();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const classeSlice = createSlice({
  name: "classe",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchClasse.pending]: (state) => {
      state.loading = true;
    },
    [fetchClasse.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchClasse.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
