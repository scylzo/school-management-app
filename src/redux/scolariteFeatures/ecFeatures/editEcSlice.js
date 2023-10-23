import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editEc = createAsyncThunk(
  "editingEc/putEc",
  async (ueData, { rejectWithValue }) => {
    try {
      const { data } = await api.editEc(ueData);
      Notiflix.Loading.standard(" mis à jour EC en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const editEcSlice = createSlice({
  name: "editingEc",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editEc.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editEc.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editEc.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
