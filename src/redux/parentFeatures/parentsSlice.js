import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchParents = createAsyncThunk("parents/getParents", async () => {
  try {
    const { data } = await api.getAllParent();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const parentsSlice = createSlice({
  name: "parents",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchParents.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchParents.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchParents.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
