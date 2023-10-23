import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const loginPats = createAsyncThunk(
  "authPatsLogin/patsLogin",
  async (parentData, { rejectWithValue }) => {
    try {
      const { data } = await api.signin(parentData);
      Notiflix.Loading.standard("Connexion en cours...");
      if (data) {
        Notiflix.Loading.remove();
        localStorage.setItem("userData", JSON.stringify(data));
        const token = JSON.parse(localStorage.getItem("userData"));
        localStorage.setItem("token", token?.accessToken);
        const loggedUserData = JSON.parse(localStorage.getItem("userData"));
        const tab = localStorage.getItem("tab");
        if (loggedUserData?.roles[0] === "ROLE_PATHS" && tab === "Pats") {
          window.location.href = "/app/pats/tableau-de-bord";
        } else Notiflix.Notify.warning("Vous n'êtes pas un pats");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const loginPatsSlice = createSlice({
  name: "authPatsLogin",
  initialState: {
    data: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  extraReducers: {
    [loginPats.pending]: (state) => {
      state.loading = true;
    },
    [loginPats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [loginPats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    },
  },
});
