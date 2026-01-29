import { useRef, useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';

export function FirstPersonControls() {
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  const {
    setControlsEnabled,
    controlsEnabled,
    setNearPortal,
    nearPortal,
    setIsEnteringPortal,
    enterProjectRoom,
    inProjectRoom
  } = useStore();

  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  const SPEED = 2.5;
  const FRICTION = 8;
  const PORTAL_PROXIMITY_DISTANCE = 4; // Distance to show "PRESS E"

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 1.7, 15);
    camera.lookAt(0, 1.7, 0);
  }, [camera]);

  // Unlock pointer when entering project room
  useEffect(() => {
    if (inProjectRoom && controlsRef.current?.isLocked) {
      controlsRef.current.unlock();
    }
  }, [inProjectRoom]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!controlsEnabled) return;

      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(true);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(true);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(true);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(true);
          break;
        case 'KeyE':
          // Enter portal if near one
          if (nearPortal) {
            setIsEnteringPortal(true);
            // Delay entering project room to show warp effect
            setTimeout(() => {
              enterProjectRoom(nearPortal);
            }, 1500);
          }
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(false);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(false);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(false);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [controlsEnabled, nearPortal, setIsEnteringPortal, enterProjectRoom]);

  // Movement update + proximity detection
  useFrame((state, delta) => {
    if (inProjectRoom) return;
    if (!controlsRef.current?.isLocked) return;

    // Apply friction
    velocity.current.x -= velocity.current.x * FRICTION * delta;
    velocity.current.z -= velocity.current.z * FRICTION * delta;

    // Calculate direction
    direction.current.z = Number(moveForward) - Number(moveBackward);
    direction.current.x = Number(moveRight) - Number(moveLeft);
    direction.current.normalize();

    // Apply movement
    if (moveForward || moveBackward) {
      velocity.current.z -= direction.current.z * SPEED * delta;
    }
    if (moveLeft || moveRight) {
      velocity.current.x -= direction.current.x * SPEED * delta;
    }

    // Move the camera
    controlsRef.current.moveRight(-velocity.current.x);
    controlsRef.current.moveForward(-velocity.current.z);

    // Keep camera at fixed height (walking on moon surface)
    camera.position.y = 1.7;

    // Boundary check - keep player within the moon surface
    const maxDistance = 50;
    const distanceFromCenter = Math.sqrt(
      camera.position.x ** 2 + camera.position.z ** 2
    );

    if (distanceFromCenter > maxDistance) {
      const angle = Math.atan2(camera.position.z, camera.position.x);
      camera.position.x = Math.cos(angle) * maxDistance;
      camera.position.z = Math.sin(angle) * maxDistance;
    }

    // Portal proximity detection
    let closestPortal = null;
    let closestDistance = Infinity;

    projects.forEach((project) => {
      const portalPos = new THREE.Vector3(
        project.position[0],
        1.7,
        project.position[2]
      );
      const distance = camera.position.distanceTo(portalPos);

      if (distance < PORTAL_PROXIMITY_DISTANCE && distance < closestDistance) {
        closestDistance = distance;
        closestPortal = project;
      }
    });

    setNearPortal(closestPortal);
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      onLock={() => setControlsEnabled(true)}
      onUnlock={() => setControlsEnabled(true)}
    />
  );
}

export default FirstPersonControls;
