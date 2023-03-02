import { createSlice } from "@reduxjs/toolkit";
import { InfoProps, PostProps, UserProps } from "@/utils/interface";
import {
  saveDataLocalStorage,
  saveUserDataLocalStorage,
} from "@/utils/getLocalStorage";

const initialState: PostProps = {
  isLoading: true,
  saveData: [],
  paginateData: [],
  userData: [],
};

export const postSlice = createSlice({
  name: "post",

  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },

    saveAllData: (state, action) => {
      saveDataLocalStorage(action.payload as InfoProps);
      state.saveData = action.payload;
    },

    saveUserData: (state, action) => {
      saveUserDataLocalStorage(action.payload as UserProps);
      state.userData = action.payload;
    },

    savePaginateData: (state, action) => {
      state.paginateData = action.payload;
    },
  },
});

export const { setLoader, saveAllData, savePaginateData, saveUserData } =
  postSlice.actions;

export default postSlice.reducer;
