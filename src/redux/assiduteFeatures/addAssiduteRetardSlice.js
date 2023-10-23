import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addAssiduteRetard = createAsyncThunk(
  "addingAssiduteRetard/postAssiduteData",
  async (assiduteData, { rejectWithValue }) => {
    try {
      const { data } = await api.addAssidute(assiduteData);
      Notiflix.Notify.success(`${assiduteData?.categorie}`);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const addAssiduteRetardSlice = createSlice({
  name: "addingAssiduteRetard",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addAssiduteRetard.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addAssiduteRetard.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addAssiduteRetard.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
