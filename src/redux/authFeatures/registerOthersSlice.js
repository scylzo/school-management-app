import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const registerOther = createAsyncThunk(
  "authRegisterOther/userRegisterOther",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.signup(userData);
      Notiflix.Loading.standard("Creation du compte en cours...");
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

export const registerOtherSlice = createSlice({
  name: "authRegisterOther",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [registerOther.pending]: (state) => {
      state.loading = true;
    },
    [registerOther.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [registerOther.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
