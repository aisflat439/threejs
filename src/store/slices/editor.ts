import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  zoom: number;
  editing: boolean;
}

const initialState: EditorState = {
  zoom: 1,
  editing: false,
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
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },
  },
});

// Selectors
export const selectIsEditing = (state: { editor: EditorState }) =>
  state.editor.editing;

export const { setZoom, zoomIn, zoomOut, setEditing } = editorSlice.actions;
export default editorSlice.reducer;
