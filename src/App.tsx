import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, TransformControls } from "@react-three/drei";
import {
  addCube,
  focusCube,
  selectCubes,
  selectSelectedCube,
  updateCube,
} from "./store/slices/cubes";
import { useDispatch, useSelector } from "./store/hooks";
import { Lighting } from "./Lighting";
import ControlsToggle from "./ControlsToggle";
import { setEnabled } from "./store/slices/controls";
import { selectIsEditing, selectMode, setMode } from "./store/slices/editor";
import { DebugHelpers } from "./DebugHelpers";
import { PhysicsWorld } from "./PhysicsWorld";
import { Mesh } from "three";

function App() {
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const dispatch = useDispatch();
  const cubes = useSelector(selectCubes);
  const editing = useSelector(selectIsEditing);
  const selectedCubeId = useSelector(selectSelectedCube);
  const mode = useSelector(selectMode);
  const [zoom, setZoom] = React.useState(1);
  const meshesRef = React.useRef<Record<string, Mesh>>({});
  const cycleMode = () => {
    if (mode === "translate") {
      dispatch(setMode("rotate"));
    } else if (mode === "rotate") {
      dispatch(setMode("scale"));
    } else {
      dispatch(setMode("translate"));
    }
  };
  return (
    <>
      <div className="app-container">
        <div className="debug-controls">
          <div>
            <button onClick={() => setIsEditorVisible((current) => !current)}>
              {isEditorVisible ? "hide editor" : "show editor"}
            </button>
          </div>
          <p>Current Mode: {mode}</p>
        </div>
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
                  scale: [1, 1, 1],
                })
              )
            }
          >
            add cube
          </button>
          <button onClick={() => setZoom(zoom + 0.1)}>zoom in</button>
          <button onClick={() => setZoom(zoom - 0.1)}>zoom out</button>
          <button onClick={() => setZoom(1)}>reset zoom</button>
          <button onClick={() => cycleMode()}>cycle mode</button>
        </div>
        <div className="sub-editor-controls">
          <p>Sub Editor Controls</p>
          <button disabled={!editing}>drag cube</button>
        </div>
        <div className="editor">
          {isEditorVisible && (
            <Canvas>
              <PhysicsWorld>
                <DebugHelpers />
                <PerspectiveCamera
                  makeDefault
                  fov={60}
                  position={[10, 5, 10]}
                />
                <ControlsToggle />
                <Lighting />
                <TransformControls
                  object={meshesRef.current[selectedCubeId!] || undefined}
                  mode={mode}
                  onObjectChange={() => {
                    const currentMesh = meshesRef.current[selectedCubeId!];

                    if (currentMesh) {
                      const { position, scale } = currentMesh;
                      const bottomY = position.y - scale.y / 2;
                      const topY = position.y + scale.y / 2;
                      if (bottomY < 0) {
                        position.y += Math.abs(bottomY);
                      }
                      if (bottomY > 0) {
                        position.y -= Math.abs(bottomY);
                      }
                      if (topY < 0) {
                        scale.y = Math.max(0.1, scale.y + topY);

                        position.y = scale.y / 2;
                      }
                    }
                  }}
                  onMouseUp={() => {
                    const currentMesh = meshesRef.current[selectedCubeId!];

                    if (currentMesh) {
                      const { position, scale } = currentMesh;
                      dispatch(
                        updateCube({
                          id: selectedCubeId!,
                          position: [position.x, position.y, position.z],
                          scale: [scale.x, scale.y, scale.z],
                        })
                      );
                    }
                  }}
                />

                {cubes.map(({ id, position, selected, scale }) => (
                  <mesh
                    key={id}
                    ref={(mesh) => {
                      if (mesh) {
                        meshesRef.current[id] = mesh;
                      } else {
                        delete meshesRef.current[id];
                      }
                    }}
                    position={position}
                    scale={scale}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(focusCube(id));
                    }}
                  >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={selected ? "green" : "blue"} />
                  </mesh>
                ))}
              </PhysicsWorld>
            </Canvas>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
