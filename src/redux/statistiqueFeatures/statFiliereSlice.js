import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchFiliereStat = createAsyncThunk(
  "filiereStat/getFiliereStat",
  async (FiliereStatData, { rejectWithValue }) => {
    try {
      const { data } = await api.getFiliere(FiliereStatData);
      Notiflix.Loading.standard("chargement en cours...");
      if (data) {
        Notiflix.Loading.remove();
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
      rejectWithValue(errorMessage);
    }
  }
);

export const getFiliereStatSlice = createSlice({
  name: "filiereStat",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchFiliereStat.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchFiliereStat.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchFiliereStat.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
