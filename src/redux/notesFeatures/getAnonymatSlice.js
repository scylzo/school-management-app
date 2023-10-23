import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchAnonymat = createAsyncThunk(
  "anonymat/getAnonymat",
  async (anonymatData, { rejectWithValue }) => {
    try {
      const { data } = await api.getAllAnonymat(anonymatData);
      Notiflix.Loading.standard("chargement en cours...");
      if (data) {
        Notiflix.Loading.remove();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const getAnonymatSlice = createSlice({
  name: "anonymat",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchAnonymat.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchAnonymat.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchAnonymat.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
