"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

export default function FallingHeart() {
  return (
    <div className="absolute z-10 w-full opacity-10">
      <DotLottiePlayer
        src="/heart-falling.lottie"
        autoplay
        loop
        speed={0.15}
      />
    </div>
  );
}