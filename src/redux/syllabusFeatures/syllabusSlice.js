import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchsyllabus = createAsyncThunk(
  "syllabus/getsyllabus",
  async () => {
    try {
      const { data } = await api.getsyllabus();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchsyllabus.pending]: (state) => {
      state.loading = true;
    },
    [fetchsyllabus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchsyllabus.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
