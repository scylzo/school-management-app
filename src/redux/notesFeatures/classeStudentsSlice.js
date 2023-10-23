import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "services/api";

export const fetchClasseStudent = createAsyncThunk(
  "classeStudent/getClasseStudent",
  async (notesData, { rejectWithValue }) => {
    try {
      const { data } = await api.getAgivenClasseStudent(notesData);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const classeStudentSlice = createSlice({
  name: "classeStudent",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchClasseStudent.pending]: (state) => {
      state.loading = true;
    },
    [fetchClasseStudent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchClasseStudent.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
