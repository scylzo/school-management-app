import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const generateAnonymat = createAsyncThunk(
  "generateAnomymat/postGenerateAnonymat",
  async (notesData, { rejectWithValue }) => {
    try {
      const { data } = await api.generateAnonymatNumbers(notesData);
      if (data) {
        Notiflix.Notify.success(" N° anonymat générés");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const generateAnonymatSlice = createSlice({
  name: "generateAnomymat",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [generateAnonymat.pending]: (state) => {
      state.loading = true;
    },
    [generateAnonymat.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [generateAnonymat.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
