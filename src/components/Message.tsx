"use client";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

export default function HeartfeltMessage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="relative max-w-lg w-full p-10 md:p-14
                   bg-black/40 backdrop-blur-md
                   border border-white/10 rounded-[2.5rem]
                   shadow-2xl text-center"
      >
        <p className="text-rose-200/90 text-[10px] tracking-[0.5em] uppercase mb-8 font-mono">
          02 . 14 . 2026
        </p>

        <div className="text-rose-100/90 text-2xl md:text-3xl font-serif italic leading-relaxed min-h-25">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 70,
              wrapperClassName: "typewriter-text",
              cursorClassName: "text-rose-500 opacity-50",
            }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2000)
                .typeString("In a world of noise,")
                .pauseFor(1000)
                .typeString(
                  "<br/><span style='color: #fb7185;'>you are my favorite song.</span>",
                )
                .start();
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
