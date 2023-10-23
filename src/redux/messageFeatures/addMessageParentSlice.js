import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addMessageParent = createAsyncThunk(
  "addingMessageParent/postMessageParentData",
  async (MessageParentData, { rejectWithValue }) => {
    try {
      const { data } = await api.addMessageParent(MessageParentData);
      Notiflix.Loading.standard("Envoie en cours...");
      if (data) {
        Notiflix.Loading.remove();
      }
      return data;
    } catch (error) {
      const errorMessageParent = error?.response?.data?.MessageParent;
      rejectWithValue(errorMessageParent);
      Notiflix.Notify.warning(errorMessageParent);
    }
  }
);

export const addMessageParentSlice = createSlice({
  name: "addingMessageParent",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addMessageParent.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addMessageParent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addMessageParent.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
