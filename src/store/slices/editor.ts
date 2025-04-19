import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  zoom: number;
}

const initialState: EditorState = {
  zoom: 1,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    zoomIn: (state) => {
      state.zoom += 0.1;
    },
    zoomOut: (state) => {
      state.zoom -= 0.1;
    },
  },
});

export const { setZoom, zoomIn, zoomOut } = editorSlice.actions;
export default editorSlice.reducer;
