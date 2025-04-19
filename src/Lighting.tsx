export const Lighting = () => (
  <>
    <ambientLight intensity={0.2} />

    {/* strong front light */}
    <directionalLight color="white" position={[5, 5, 5]} intensity={1} />

    {/* left‑behind fill */}
    <directionalLight color="white" position={[-5, 2, -5]} intensity={0.5} />

    {/* right‑behind fill */}
    <directionalLight color="white" position={[5, 2, -5]} intensity={0.5} />
  </>
);
