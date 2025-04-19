import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ControlsState {
  enabled: boolean;
  zoomEnabled: boolean;
  panEnabled: boolean;
  rotateEnabled: boolean;
}

const initialState: ControlsState = {
  enabled: true,
  zoomEnabled: true,
  panEnabled: true,
  rotateEnabled: true,
};

const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setEnabled(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },
    setZoomEnabled(state, action: PayloadAction<boolean>) {
      state.zoomEnabled = action.payload;
    },
    setPanEnabled(state, action: PayloadAction<boolean>) {
      state.panEnabled = action.payload;
    },
    setRotateEnabled(state, action: PayloadAction<boolean>) {
      state.rotateEnabled = action.payload;
    },
  },
});

// Selectors
export const selectControls = (state: { controls: ControlsState }) =>
  state.controls;

export const { setEnabled, setZoomEnabled, setPanEnabled, setRotateEnabled } =
  controlsSlice.actions;

export default controlsSlice.reducer;
