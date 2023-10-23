import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const registerParent = createAsyncThunk(
  "addingParent/postParent",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.signupParent(userData);
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

export const registerParentSlice = createSlice({
  name: "addingParent",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [registerParent.pending]: (state) => {
      state.loading = true;
    },
    [registerParent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [registerParent.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
