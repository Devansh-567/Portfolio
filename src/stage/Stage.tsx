import { useEffect, useRef } from "react";
import { createStage } from "./engine";

/** Fixed full-screen WebGL canvas that sits behind every section. */
const Stage = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const stage = createStage(ref.current);
    return () => stage?.dispose();
  }, []);
  return <canvas ref={ref} className="stage" aria-hidden="true" />;
};

export default Stage;
