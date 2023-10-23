import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addAssiduteAbsence = createAsyncThunk(
  "addingAssiduteAbsence/postAssiduteData",
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

export const addAssiduteAbsenceSlice = createSlice({
  name: "addingAssiduteAbsence",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addAssiduteAbsence.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addAssiduteAbsence.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addAssiduteAbsence.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
