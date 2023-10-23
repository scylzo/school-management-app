import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createNotes = createAsyncThunk(
  "creatingNotes/postNotes",
  async (NotesData, { rejectWithValue }) => {
    try {
      const { data } = await api.addNotes(NotesData);
      if (data) {
        Notiflix.Notify.success(" Champs notes générés");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const createNotesSlice = createSlice({
  name: "creatingNotes",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
    totalRequest: 0,
  },
  extraReducers: {
    [createNotes.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
      state.totalRequest = state.totalRequest++;
    },
    [createNotes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createNotes.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
