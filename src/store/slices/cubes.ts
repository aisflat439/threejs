import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectIsEditing, setEditing } from "./editor";
import { AppDispatch, RootState } from "..";

interface Cube {
  id: string;
  name: string;
  color: string;
  center: [x: number, y: number, z: number];
  scale: [x: number, y: number, z: number];
  selected?: boolean;
}
interface CubesState {
  cubes: Cube[];
  selectedCubeId?: string;
}

const initialState: CubesState = {
  cubes: [],
};
const cubesSlice = createSlice({
  name: "cubes",
  initialState,
  reducers: {
    addCube: (state, action: PayloadAction<Cube>) => {
      state.cubes.push(action.payload);
    },
    deleteCube: (state, action: PayloadAction<string>) => {
      state.cubes = state.cubes.filter((cube) => cube.id !== action.payload);
    },
    focusCube: (state, action: PayloadAction<string>) => {
      if (state.selectedCubeId === action.payload) {
        state.selectedCubeId = undefined;
        state.cubes = state.cubes.map((cube) => ({ ...cube, selected: false }));
        return;
      }

      state.selectedCubeId = action.payload;
      state.cubes = state.cubes.map((cube) => {
        if (cube.id === action.payload) {
          return { ...cube, selected: !cube.selected };
        }
        return { ...cube, selected: false };
      });
    },
    updateCube: (
      state,
      action: PayloadAction<{
        id: string;
        center: [number, number, number];
        scale: [number, number, number];
      }>
    ) => {
      const { id, center, scale } = action.payload;
      const cube = state.cubes.find((c) => c.id === id);
      if (cube) {
        cube.center = center;
        cube.scale = scale;
      }
    },
  },
});

// Selectors
export const selectCubes = (state: { cubes: CubesState }) => state.cubes.cubes;
export const selectCubeById = (state: { cubes: CubesState }, id: string) =>
  state.cubes.cubes.find((cube) => cube.id === id);
export const selectHasSelectedCube = (state: { cubes: CubesState }) =>
  state.cubes.selectedCubeId;
export const selectSelectedCube = (state: { cubes: CubesState }) =>
  state.cubes.selectedCubeId;

export const focusCube =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(focusCubeWithoutEffects(id));
    const state = getState();
    const isEditing = selectIsEditing(state);
    dispatch(setEditing(!isEditing));
  };

const { focusCube: focusCubeWithoutEffects } = cubesSlice.actions;
export const { addCube, deleteCube, updateCube } = cubesSlice.actions;
export default cubesSlice.reducer;
