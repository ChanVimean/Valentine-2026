"use client";
import { useEffect, useRef, useState } from "react";
import { IoPause, IoPlay, IoPlayBack, IoPlayForward } from "react-icons/io5";

// Type-safe interface for legacy browser support
interface WindowWithWebkit extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export default function MusicBox() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  // Persistence refs to prevent "HTMLMediaElement already connected" errors
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Initialize Audio Context (Single Instance)
    const Win = window as unknown as WindowWithWebkit;
    const AudioContextClass = window.AudioContext || Win.webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;

    // 2. Initialize Analyzer
    const analyzer = ctx.createAnalyser();
    analyzer.fftSize = 64;
    analyzer.smoothingTimeConstant = 0.8;
    analyzerRef.current = analyzer;

    // 3. Connect Source (The Fix for the Runtime Error)
    try {
      if (!sourceRef.current) {
        sourceRef.current = ctx.createMediaElementSource(audio);
      }
      sourceRef.current.connect(analyzer);
      analyzer.connect(ctx.destination);
    } catch (err) {
      // Catching if already connected during hot-reloads
      console.log("Audio source connection managed. ", err);
    }

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    let animationId: number;

    // 4. Beat Broadcaster for FallingHearts.tsx
    const broadcastBeat = () => {
      if (analyzerRef.current) {
        analyzerRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const avg = sum / dataArray.length;

        window.dispatchEvent(
          new CustomEvent("music-beat", {
            detail: avg / 255,
          }),
        );
      }
      animationId = requestAnimationFrame(broadcastBeat);
    };

    // 5. Volume Fade-in & Auto-play
    audio.volume = 0;
    const playAudio = async () => {
      try {
        if (ctx.state === "suspended") await ctx.resume();
        await audio.play();
        setIsPlaying(true);
        broadcastBeat();

        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol = Math.min(vol + 0.05, 1);
            audio.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 150);
      } catch (err) {
        console.log("Autoplay check:", err);
      }
    };

    playAudio();

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      cancelAnimationFrame(animationId);
      // Disconnect nodes but keep sourceRef for potential remounts
      analyzer.disconnect();
      sourceRef.current?.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) audioRef.current.currentTime += seconds;
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 group">
      {/* Song Label */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-rose-200 text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl">
          Bruno Mars — Just The Way You Are
        </div>
      </div>

      {/* Control Pill */}
      <div className="flex items-center justify-between gap-6 px-8 py-2 w-max h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_50px_rgba(255,182,193,0.1)] hover:border-rose-400/50 transition-all duration-500">
        <audio
          ref={audioRef}
          src="/music/track2.mp3"
          loop
          crossOrigin="anonymous"
        />

        <button
          onClick={() => skip(-5)}
          className="text-white/40 hover:text-rose-300 transition-colors"
        >
          <IoPlayBack size={22} />
        </button>

        <button
          onClick={togglePlay}
          className="relative w-11 h-11 shrink-0 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 text-white rounded-full transition-all duration-300 group-hover:scale-105"
        >
          {isPlaying ? (
            <IoPause size={22} />
          ) : (
            <IoPlay size={22} className="ml-1" />
          )}

          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={126}
              strokeDashoffset={126 - (126 * (progress || 0)) / 100}
              strokeLinecap="round"
              className={`transition-all duration-300 ${isPlaying ? "text-rose-500" : "text-white/10"}`}
            />
          </svg>
        </button>

        <button
          onClick={() => skip(5)}
          className="text-white/40 hover:text-rose-300 transition-colors"
        >
          <IoPlayForward size={22} />
        </button>
      </div>
    </div>
  );
}
