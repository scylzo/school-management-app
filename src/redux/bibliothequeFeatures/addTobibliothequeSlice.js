import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addToBibliotheque = createAsyncThunk(
  "addingToBibliotheque/postToBibliothequeData",
  async (ToBibliothequeData, { rejectWithValue }) => {
    try {
      const { data } = await api.addToBibliotheque(ToBibliothequeData);
      Notiflix.Loading.standard("Ajout en cours...");
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

export const addToBibliothequeSlice = createSlice({
  name: "addingToBibliotheque",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addToBibliotheque.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addToBibliotheque.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addToBibliotheque.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
