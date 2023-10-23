import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addEc = createAsyncThunk(
  "addingEc/postEc",
  async (ueData, { rejectWithValue }) => {
    try {
      const { data } = await api.addEc(ueData);
      Notiflix.Loading.standard(" Ajout EC en cours...");
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

export const addEcSlice = createSlice({
  name: "addingEc",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addEc.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addEc.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addEc.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
