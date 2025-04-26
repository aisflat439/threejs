import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  zoom: number;
  editing: boolean;
  mode: "translate" | "rotate" | "scale";
}

const initialState: EditorState = {
  zoom: 1,
  editing: false,
  mode: "translate",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setMode: (
      state,
      action: PayloadAction<"translate" | "rotate" | "scale">
    ) => {
      state.mode = action.payload;
    },
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
export const selectMode = (state: { editor: EditorState }) => state.editor.mode;

export const { setZoom, zoomIn, zoomOut, setEditing, setMode } =
  editorSlice.actions;
export default editorSlice.reducer;
