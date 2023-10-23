import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editUser = createAsyncThunk(
  "editingUser/editingUserData",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.editUser(userData);
      Notiflix.Loading.standard("Edition en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const editUserSlice = createSlice({
  name: "editingUser",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editUser.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editUser.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
