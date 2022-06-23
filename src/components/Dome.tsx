import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useAspect } from "@react-three/drei";

const Dome = () => {
  const size = useAspect(100, 100);
  const [video, setVideo] = useState<any>(undefined);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      let found = false;
      devices.forEach((device) => {
        console.warn(device.label);
        if (device.label.startsWith("RICOH")) {
          found = true;
          navigator.mediaDevices
            .getUserMedia({
              video: {
                deviceId: device.deviceId,
              },
              audio: false,
            })
            .then((stream) => {
              if (video !== undefined) {
                return;
              }
              const vid = document.createElement("video");
              console.warn(stream);
              vid.srcObject = stream;
              vid.crossOrigin = "anonymous";
              vid.loop = true;
              vid
                .play()
                .then(() => console.log("play"))
                .catch((error: any) => console.warn(error));
              setVideo(vid);
            });
        }
      });
      if (!found) {
        const device = devices[0];
        if (device === undefined) {
          return;
        }
        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: device.deviceId,
            },
            audio: false,
          })
          .then((stream) => {
            if (video !== undefined) {
              return;
            }
            const vid = document.createElement("video");
            console.warn(stream);
            vid.srcObject = stream;
            vid.crossOrigin = "anonymous";
            vid.loop = true;
            vid
              .play()
              .then(() => console.log("play"))
              .catch((error: any) => console.warn(error));
            setVideo(vid);
          });
      }
    });
  }, [video]);
  if (video === undefined) {
    return <mesh />;
  }
  return (
    <mesh scale={size}>
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial attach="material" side={THREE.BackSide}>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default Dome;
