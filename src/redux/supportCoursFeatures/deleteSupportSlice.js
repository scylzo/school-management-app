import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteSupport = createAsyncThunk(
  "deletingSupport/deleteSupport",
  async (notifData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteSupport(notifData);
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

export const deleteSupportSlice = createSlice({
  name: "deletingSupport",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteSupport.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteSupport.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteSupport.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
