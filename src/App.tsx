import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  addCube,
  selectCube,
  selectCubes,
  selectHasSelectedCube,
} from "./store/slices/cubes";
import { useDispatch, useSelector } from "./store/hooks";
import { Lighting } from "./Lighting";

function App() {
  const dispatch = useDispatch();
  const cubes = useSelector(selectCubes);
  const isSelecting = useSelector(selectHasSelectedCube);
  const [zoom, setZoom] = React.useState(1);
  const [enabled, setEnabled] = React.useState(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      setEnabled(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      setEnabled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
        </div>
        <div className="editor">
          <Canvas>
            <PerspectiveCamera makeDefault fov={60} position={[10, 5, 10]} />
            <OrbitControls
              enabled={!isSelecting}
              // enabled={enabled} enableRotate={enabled}
              // enableRotate={enabled}
            />
            <Lighting />

            {cubes.map(({ id, position, selected }) => (
              <mesh
                key={id}
                position={position}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(selectCube(id));
                }}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={selected ? "green" : "blue"} />
              </mesh>
            ))}
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
