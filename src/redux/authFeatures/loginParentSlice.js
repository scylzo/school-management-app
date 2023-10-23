import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const loginParent = createAsyncThunk(
  "authParentLogin/parentLogin",
  async (parentData, { rejectWithValue }) => {
    try {
      const { data } = await api.signinParent(parentData);
      Notiflix.Loading.standard("Connexion en cours...");
      if (data) {
        Notiflix.Loading.remove();
        localStorage.setItem("userData", JSON.stringify(data));
        const token = JSON.parse(localStorage.getItem("userData"));
        localStorage.setItem("token", token?.accessToken);
        const loggedUserData = JSON.parse(localStorage.getItem("userData"));
        const tab = localStorage.getItem("tab");
        if (loggedUserData?.roles[0] === "ROLE_PARENT" && tab === "Parent") {
          window.location.href = "/app/parent/enfant/tableau-de-bord";
        } else Notiflix.Notify.warning("Vous n'êtes pas un parent");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning("Vous n'êtes pas un parent");
    }
  }
);

export const loginParentSlice = createSlice({
  name: "authParentLogin",
  initialState: {
    data: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  extraReducers: {
    [loginParent.pending]: (state) => {
      state.loading = true;
    },
    [loginParent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [loginParent.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = payload;
    },
  },
});
