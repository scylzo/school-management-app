import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const updateUserStatus = createAsyncThunk(
  "updatingUserStatus/updatingUserStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUserStatus(userData);
      Notiflix.Loading.standard("mis à jour statut  en cours...");
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

export const updateUserStatusSlice = createSlice({
  name: "updatingUserStatus",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [updateUserStatus.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [updateUserStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [updateUserStatus.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
