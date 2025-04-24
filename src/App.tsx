import React from "react";
import { Canvas } from "@react-three/fiber";
import { DragControls, PerspectiveCamera, Text } from "@react-three/drei";
import {
  addCube,
  focusCube,
  selectCubes,
  selectSelectedCube,
  updateCubePosition,
} from "./store/slices/cubes";
import { useDispatch, useSelector } from "./store/hooks";
import { Lighting } from "./Lighting";
import ControlsToggle from "./ControlsToggle";
import { setEnabled } from "./store/slices/controls";
import { selectIsEditing } from "./store/slices/editor";
import { Matrix4, Vector3 } from "three";
import { DebugHelpers } from "./DebugHelpers";

function App() {
  const dispatch = useDispatch();
  const cubes = useSelector(selectCubes);
  const editing = useSelector(selectIsEditing);
  const selectedCubeId = useSelector(selectSelectedCube);
  const [zoom, setZoom] = React.useState(1);

  return (
    <>
      <div className="app-container">
        <div className="editor-controls">
          editor controls
          <button
            onClick={() =>
              dispatch(
                addCube({
                  id: Date.now().toString(),
                  name: `Cube ${cubes.length + 1}`,
                  color: "orange",
                  position: [0, 0.5, cubes.length * 2],
                })
              )
            }
          >
            add cube
          </button>
          <button onClick={() => setZoom(zoom + 0.1)}>zoom in</button>
          <button onClick={() => setZoom(zoom - 0.1)}>zoom out</button>
          <button onClick={() => setZoom(1)}>reset zoom</button>
        </div>
        <div className="sub-editor-controls">
          <p>Sub Editor Controls</p>
          <button disabled={!editing}>drag cube</button>
        </div>
        <div className="editor">
          <Canvas>
            <DebugHelpers />
            <PerspectiveCamera makeDefault fov={60} position={[10, 5, 10]} />
            <ControlsToggle />
            <Lighting />

            {cubes.map(({ id, position, selected }) => (
              <DragControls
                key={id}
                onDragStart={() => {
                  dispatch(setEnabled(false));
                }}
                onDrag={(
                  localMatrix: Matrix4,
                  deltaLocalMatrix: Matrix4,
                  worldMatrix: Matrix4,
                  deltaWorldMatrix: Matrix4
                ) => {
                  const position = new Vector3().setFromMatrixPosition(
                    worldMatrix
                  );
                  console.log("position: ", position);

                  // const id = selectedCubeId;
                  // dispatch(updateCubePosition({ id, position }));
                }}
                onDragEnd={() => {
                  dispatch(setEnabled(true));
                }}
              >
                <mesh
                  key={id}
                  position={position}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(focusCube(id));
                    dispatch(setEnabled(true));
                  }}
                >
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={selected ? "green" : "blue"} />
                </mesh>
              </DragControls>
            ))}
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
