// CaptionAbout.jsx
import React from "react";
import CubeButton from "./CubeButton";

export default function CaptionAbout({
  bg = "#12B9FF",
  title = "Nacimos con la idea de mejorar tu empresa a través de la tecnología.",
  ctaText = "ver servicios",
}) {
  const handleNavigate = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/services");
    }
  };

  return (
    <section
      id="caption-about"
      className="relative w-full"
      style={{ minHeight: "100svh", backgroundColor: bg }}
    >
      <div className="h-[100svh] grid place-items-center px-6">
        <div className="text-center max-w-[72rem]">
          <h3 className="font-extrabold leading-tight text-white text-[clamp(24px,5vw,64px)]">
            {title}
          </h3>

          <div className="mt-8 flex justify-center">
            <CubeButton
              text={ctaText}
              onClick={handleNavigate}
              width={280}
              height={72}
              thickness={14}
              frontClass="bg-neutral-900 text-white"
              backClass="bg-white text-neutral-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
