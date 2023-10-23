import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const updateUserProfil = createAsyncThunk(
  "updatingUserProfil/updatingUserProfil",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.updateUserProfil(userData);
      Notiflix.Loading.standard("Le profil a été mis à jour avec succès");
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

export const updateUserProfilSlice = createSlice({
  name: "updatingUserProfil",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [updateUserProfil.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [updateUserProfil.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [updateUserProfil.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
