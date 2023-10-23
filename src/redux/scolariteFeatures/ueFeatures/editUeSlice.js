import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editUe = createAsyncThunk(
  "editingUe/putUe",
  async (ueData, { rejectWithValue }) => {
    try {
      const { data } = await api.editUe(ueData);
      Notiflix.Loading.standard(" mis à jour UE en cours...");
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

export const editUeSlice = createSlice({
  name: "editingUe",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editUe.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editUe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editUe.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
