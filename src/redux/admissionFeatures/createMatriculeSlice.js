import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createMatricule = createAsyncThunk(
  "creationMatricule/postMatricule",
  async (createMatriculeData, { rejectWithValue }) => {
    try {
      const { data } = await api.createStudentMatricule(createMatriculeData);
      Notiflix.Loading.standard("Attribution d'un matricule en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const createMatriculeSlice = createSlice({
  name: "creationMatricule",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [createMatricule.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [createMatricule.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createMatricule.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
