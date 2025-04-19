import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
import {
  selectControls,
  setEnabled,
  setZoomEnabled,
  setPanEnabled,
  setRotateEnabled,
} from "./store/slices/controls";

export default function ControlsToggle() {
  const controlsRef = React.useRef<ThreeOrbitControls | null>(null);
  const dispatch = useDispatch();
  const { enabled, zoomEnabled, panEnabled, rotateEnabled } =
    useSelector(selectControls);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "o":
          dispatch(setEnabled(!enabled));
          break;
        case "z":
          dispatch(setZoomEnabled(!zoomEnabled));
          break;
        case "r":
          dispatch(setRotateEnabled(!rotateEnabled));
          break;
        case "p":
          dispatch(setPanEnabled(!panEnabled));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => void window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, enabled, zoomEnabled, rotateEnabled, panEnabled]);

  React.useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    ctrl.enabled = enabled;
    ctrl.enableZoom = zoomEnabled;
    ctrl.enableRotate = rotateEnabled;
    ctrl.enablePan = panEnabled;
  }, [enabled, zoomEnabled, rotateEnabled, panEnabled]);

  return <DreiOrbitControls ref={controlsRef} />;
}
