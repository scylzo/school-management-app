import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addSupportCours = createAsyncThunk(
  "addingSupportCours/postSupportCours",
  async (SupportCoursData, { rejectWithValue }) => {
    try {
      const { data } = await api.addSupportCours(SupportCoursData);
      Notiflix.Loading.standard("Ajout cours en cours...");
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

export const addSupportCoursSlice = createSlice({
  name: "addingSupportCours",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addSupportCours.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addSupportCours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addSupportCours.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
