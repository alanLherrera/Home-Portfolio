import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Preload, useGLTF, OrbitControls } from "@react-three/drei";

import CanvasLoader from "../Loader";

extend({ OrbitControls });

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.9}
        position={isMobile ? [0, -3, -2.2] : [5, -2.5, -0.5]}
        rotation={[-0.05, -0.6, -0.1]}
      />
    </mesh>
  );
};

const CustomCameraControls = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    // Update the camera position to create a rotating globe effect
    ref.current.position.x = Math.sin(clock.elapsedTime * 0.2) * 30;
    ref.current.position.z = Math.cos(clock.elapsedTime * 0.2) * 30;
    ref.current.lookAt(0, 0, 0);
  });

  return <perspectiveCamera ref={ref} />;
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <CustomCameraControls />
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
