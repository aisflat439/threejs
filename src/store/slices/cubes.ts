import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Cube {
  id: string;
  name: string;
  color: string;
  position: [x: number, y: number, z: number];
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
    selectCube: (state, action: PayloadAction<string>) => {
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
  },
});

// Selectors
export const selectCubes = (state: { cubes: CubesState }) => state.cubes.cubes;
export const selectCubeById = (state: { cubes: CubesState }, id: string) =>
  state.cubes.cubes.find((cube) => cube.id === id);
export const selectHasSelectedCube = (state: { cubes: CubesState }) =>
  state.cubes.selectedCubeId;

export const { addCube, deleteCube, selectCube } = cubesSlice.actions;
export default cubesSlice.reducer;
