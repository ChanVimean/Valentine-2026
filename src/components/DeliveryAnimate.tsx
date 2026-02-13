"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

export default function DeliveryAnimate({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <div className="w-full max-w-xl">
      <DotLottiePlayer
        src="/delivery.lottie"
        autoplay
        onEvent={(event) => {
          if (event === 'complete') onComplete()
        }}
      />
    </div>
  );
}
