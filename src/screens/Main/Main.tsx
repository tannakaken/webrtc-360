import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Dome from "../../components/Dome";
import useWebSocket from "react-use-websocket";

const Main = () => {
  const socketUrl = "ws://localhost:8000/ws";
  const {
    sendMessage,
    lastMessage,
    // readyState,
  } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.warn(lastMessage);
    }
  }, [lastMessage]);

  useEffect(() => {
    const sendLoop = () => {
      sendMessage("hello");
      setTimeout(sendLoop, 10000);
    };
    sendLoop();
  }, [sendMessage]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        <Suspense fallback={null}>
          <Dome />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Main;
