import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addUe = createAsyncThunk(
  "addingUe/postUe",
  async (ueData, { rejectWithValue }) => {
    try {
      const { data } = await api.addUe(ueData);
      Notiflix.Loading.standard(" Ajout UE en cours...");
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

export const addUeSlice = createSlice({
  name: "addingUe",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addUe.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addUe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addUe.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
