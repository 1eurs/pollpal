import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

function InteractivePollBar({ position, color, height, hoverHeight }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    meshRef.current.scale.y = hovered ? hoverHeight : height;
  });

  return (
    <Box 
      ref={meshRef} 
      args={[0.8, height, 1]} 
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </Box>
  );
}

const PollPal3DComponent = () => {
  const pollData = [
    { color: '#E85A4F', height: 2, hoverHeight: 3 },
    { color: '#4E8098', height: 3, hoverHeight: 4 },
    { color: '#3E3E3E', height: 2.5, hoverHeight: 2.5 },
    { color: '#6D6D6D', height: 1.5, hoverHeight: 2.5 },
  ];

  return (
    <Canvas style={{ height: '400px', width: '100%' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
      {pollData.map((data, index) => (
        <InteractivePollBar 
          key={index}
          position={[-1.5 + index * 1.5, 0, 0]}
          color={data.color}
          height={data.height}
          hoverHeight={data.hoverHeight}
        />
      ))}
      <OrbitControls  />
    </Canvas>
  );
};

export default PollPal3DComponent;
