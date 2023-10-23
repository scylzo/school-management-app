import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editUserPassword = createAsyncThunk(
  "editingUserPassword/editingUserPasswordData",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.editUserPassword(userData);
      Notiflix.Loading.standard("Changement du mot de passe en cours...");
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

export const editUserPasswordSlice = createSlice({
  name: "editingUserPassword",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editUserPassword.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editUserPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editUserPassword.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
