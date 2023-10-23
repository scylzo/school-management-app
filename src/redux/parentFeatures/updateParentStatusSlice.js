import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const updateParentStatus = createAsyncThunk(
  "updatingParentStatus/updateParentStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.updateParentStatus(userData);
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

export const updateParentStatusSlice = createSlice({
  name: "updatingParentStatus",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [updateParentStatus.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [updateParentStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [updateParentStatus.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
