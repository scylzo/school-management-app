import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addMessage = createAsyncThunk(
  "addingMessage/postMessageData",
  async (MessageData, { rejectWithValue }) => {
    try {
      const { data } = await api.addMessage(MessageData);
      Notiflix.Loading.standard("Envoie en cours...");
      if (data) {
        Notiflix.Loading.remove();
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const addMessageSlice = createSlice({
  name: "addingMessage",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addMessage.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addMessage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addMessage.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
