import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";

export const getlistMessage = createAsyncThunk(
  "listMessage/postListMessageData",
  async (ListMessageData, { rejectWithValue }) => {
    try {
      const { data } = await api.getMessageList(ListMessageData);
      if (data) {
        return data;
      }
    } catch (error) {
      const errorListMessage = error?.response?.data?.ListMessage;
      rejectWithValue(errorListMessage);
    }
  }
);

export const getlistMessageSlice = createSlice({
  name: "listMessage",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [getlistMessage.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [getlistMessage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getlistMessage.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
