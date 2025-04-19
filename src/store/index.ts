import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./slices/editor";
import cubesReducer from "./slices/cubes";
import controlsReducer from "./slices/controls";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    cubes: cubesReducer,
    controls: controlsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
