import { useFrame } from "@react-three/fiber";
import React from "react";
import { Group } from "three";

const UPPER_BOUND = 10;
const LOWER_BOUND = 0;
const BOUNDARY = 10;

export const PhysicsWorld = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.children.forEach((child) => {
        if (child.position.y < LOWER_BOUND) child.position.y = LOWER_BOUND;
        if (child.position.y > UPPER_BOUND) child.position.y = UPPER_BOUND;
        if (child.position.x < -BOUNDARY) child.position.x = -BOUNDARY;
        if (child.position.x > BOUNDARY) child.position.x = BOUNDARY;
        if (child.position.z < -BOUNDARY) child.position.z = -BOUNDARY;
        if (child.position.z > BOUNDARY) child.position.z = BOUNDARY;
      });
    }
  });

  return <group ref={ref}>{children}</group>;
};
