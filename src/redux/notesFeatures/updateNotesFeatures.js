import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const updateNotes = createAsyncThunk(
  "updatingNotes/putNotes",
  async (NotesData, { rejectWithValue }) => {
    try {
      const { data } = await api.updateNotes(NotesData);
      Notiflix.Loading.standard("Ajout notes en cours...");
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

export const updateNotesSlice = createSlice({
  name: "updatingNotes",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [updateNotes.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [updateNotes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [updateNotes.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
