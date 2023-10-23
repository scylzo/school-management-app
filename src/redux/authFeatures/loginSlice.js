import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const login = createAsyncThunk(
  "authLogin/userLogin",
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
          loggedUserData?.roles[0] === "ROLE_ETUDIANT" &&
          tab === "Etudiant"
        ) {
          window.location.href = "/app/etudiants/tableau-de-bord";
        } else {
          Notiflix.Notify.warning("Vous n'êtes pas un étudiant");
          localStorage.removeItem("tab");
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
        }
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const loginSlice = createSlice({
  name: "authLogin",
  initialState: {
    data: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    },
  },
});
