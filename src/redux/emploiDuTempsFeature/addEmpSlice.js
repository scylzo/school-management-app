import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addEmp = createAsyncThunk(
  "addingEmp/postEmpData",
  async (EmpData, { rejectWithValue }) => {
    try {
      const { data } = await api.addEmp(EmpData);
      Notiflix.Loading.standard("Ajout en cours...");
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

export const addEmpSlice = createSlice({
  name: "addingEmp",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addEmp.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addEmp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addEmp.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
