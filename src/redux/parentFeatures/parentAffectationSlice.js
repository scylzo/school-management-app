import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const affectParent = createAsyncThunk(
  "affectingParent/linkParentToChild",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.affectParentToChild(userData);
      if (data) {
        Notiflix.Notify.success("Affectation reussi !");
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

export const parentAffectationSlice = createSlice({
  name: "addingParent",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [affectParent.pending]: (state) => {
      state.loading = true;
    },
    [affectParent.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [affectParent.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
