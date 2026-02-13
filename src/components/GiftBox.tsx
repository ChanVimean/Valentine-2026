"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

export default function GiftBox() {
  return (
    <div className="w-64 h-64 md:w-80 md:h-80">
      <DotLottiePlayer
        src="/gift.lottie"
        autoplay
        loop
      />
    </div>
  );
}