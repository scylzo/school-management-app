import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const register = createAsyncThunk(
  "authRegister/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.signup(userData);
      Notiflix.Loading.standard("Inscription en cours...");
      if (data) {
        Notiflix.Loading.remove();
        Notiflix.Notify.info(
          "Un mail contenant vos informations de connexion vient de vous etre envoyer .",
          {
            timeout: 7000,
          }
        );
        window.location.href = "/";
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const registerSlice = createSlice({
  name: "authRegister",
  initialState: {
    data: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    },
  },
});
