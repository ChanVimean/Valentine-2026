"use client";

import DeliveryAnimate from "@/components/DeliveryAnimate";
import FallingHeart from "@/components/FallingHeart";
import FlowerScene from "@/components/FlowerScene";
import GiftBox from "@/components/GiftBox";
import MusicPlayer from "@/components/MusicPlayer";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";

export default function Page() {
  const [stage, setStage] = useState(0);

  // Helper to move to next part
  const nextStage = () => setStage((prev) => prev + 1);

  return (
    <main className="relative h-screen w-full bg-[#090a0f] overflow-hidden">
      <AnimatePresence mode="wait">
        {/* STAGE 0: THE INTRO - Essential for Audio Context */}
        {stage === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            onClick={nextStage} // Entire screen is clickable for better UX
          >
            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                <span className="animate-bounce">
                  <FaHeadphonesSimple size={60} />
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-rose-200/70 tracking-[0.3em] font-semibold uppercase text-xs">
                  Best experienced with sound
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  Tap anywhere to begin
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Delivery Animation */}
        {stage === 1 && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            className="flex items-center justify-center h-screen"
          >
            {/* Pass nextStage to your component's internal 'onComplete' trigger */}
            <DeliveryAnimate onComplete={nextStage} />
          </motion.div>
        )}

        {/* STAGE 2: Gift Box Pop-up */}
        {stage === 2 && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 2 }} // Zoom into the gift
            className="flex flex-col items-center justify-center h-screen cursor-pointer"
            onClick={nextStage}
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 5, 0],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <GiftBox />
            </motion.div>
            <p className="mt-8 text-rose-300 font-light tracking-[0.4em] uppercase text-[10px] animate-pulse">
              Open your gift
            </p>
          </motion.div>
        )}

        {/* STAGE 3: The Big Reveal (Corrected from stage 4) */}
        {stage === 3 && (
          <motion.div
            key="flowers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative h-screen w-full bg-black"
          >
            <FallingHeart />
            <MusicPlayer />
            <FlowerScene />

            {/* Valentine's Watermark */}
            <div className="fixed top-8 right-8 z-50 pointer-events-none">
              <p className="text-white text-xs tracking-widest font-mono">
                FEB 14, 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
