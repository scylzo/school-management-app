import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const loginAdmin = createAsyncThunk(
  "authAdminLogin/adminUserLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.signin(userData);
      Notiflix.Loading.standard("Connexion en cours...");
      if (data) {
        Notiflix.Loading.remove();
        localStorage.setItem("userData", JSON.stringify(data));
        const token = JSON.parse(localStorage.getItem("userData"));
        localStorage.setItem("token", token?.accessToken);
        const loggedUserData = JSON.parse(localStorage.getItem("userData"));
        const tab = localStorage.getItem("tab");
        if (
          loggedUserData?.roles[0] === "ROLE_ADMIN" &&
          tab === "Administration"
        ) {
          window.location.href = "/app/administration/tableau-de-bord";
        } else Notiflix.Notify.warning("Vous n'êtes pas un administrateur");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const loginAdminSlice = createSlice({
  name: "authAdminLogin",
  initialState: {
    data: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.loading = true;
    },
    [loginAdmin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    },
  },
});
