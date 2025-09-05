"use client";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function AnimatedBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await loadFull(engine);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#16a34a" } },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#fff" },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
