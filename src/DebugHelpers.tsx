import React from "react";
import { Text } from "@react-three/drei";

export const DebugHelpers: React.FC = () => {
  return (
    <>
      {/* show world axes (red=x, green=y, blue=z) */}
      <axesHelper args={[5]} />
      {/* show a ground grid (size=10, divisions=10) */}
      <gridHelper args={[10, 10]} />
      {/* Axes labels */}
      <Text position={[5.5, 0, 0]} color="red" fontSize={0.5}>
        X
      </Text>
      <Text position={[0, 5.5, 0]} color="green" fontSize={0.5}>
        Y
      </Text>
      <Text position={[0, 0, 5.5]} color="blue" fontSize={0.5}>
        Z
      </Text>
    </>
  );
};
