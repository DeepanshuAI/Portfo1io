"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import ReactorScene from "./ReactorScene";
import { useSection } from "@/lib/section-context";
import { cn } from "@/lib/utils";

/**
 * THE shared WebGL canvas for the whole site — mounted once, fixed behind
 * content. It only renders frames while the Reactor (skills) section is
 * active (frameloop="never" otherwise = zero GPU cost), and fades out
 * elsewhere. One context, one canvas, on demand.
 */
export default function SharedCanvas() {
  const { active } = useSection();
  const live = active === "engineering-core";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[4]"
      style={{
        opacity: live ? 1 : 0,
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Canvas
        eventSource={mounted ? document.body : undefined}
        eventPrefix="client"
        frameloop={live ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ReactorScene />
        </Suspense>
      </Canvas>
    </div>
  );
}


