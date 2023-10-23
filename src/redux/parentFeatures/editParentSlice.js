import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editParent = createAsyncThunk(
  "editingParent/editingParentData",
  async (parentData, { rejectWithValue }) => {
    try {
      const { data } = await api.updateParent(parentData);
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

export const editParentSlice = createSlice({
  name: "editingParent",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editParent.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editParent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editParent.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
