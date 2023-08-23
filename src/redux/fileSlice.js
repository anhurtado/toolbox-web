import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  lines: [],
  fileSelect: undefined
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    updateFiles: (state, action) => {
      const { files } = action.payload;
      state.files = files;
    },
    updateLines: (state, action) => {
      const { lines } = action.payload;
      state.lines = lines;
    },
    updateFileSelect: (state, action) => {
      const fileName = action.payload;
      state.fileSelect = fileName;
    },
  }
});

export const { updateFiles, updateLines, updateFileSelect } = fileSlice.actions;
export default fileSlice.reducer;