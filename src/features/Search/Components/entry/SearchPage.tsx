import { useEffect, useState } from "react";

import {
  AnimatedSearchBar,
  AnimatedStats,
  BackgroundAnimations,
} from "../animatedElements/BackgroundAnimations";

export default function SearchPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 py-8 px-4 scroll-smooth relative overflow-hidden">
      <BackgroundAnimations />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Animated title */}
        <h1
          className={`w-full title text-center text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 via-green-500 font-bold mb-4 transition-all duration-1000 ${
            mounted
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          Search And Explore
        </h1>

        {/* Animated subtitle */}
        <p
          className={`text-center text-gray-600 font-medium text-lg mb-8 transition-all duration-1000 delay-300 ${
            mounted
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          Explore & find the best people and companies
        </p>

        {/* Animated search bar */}
        <div
          className={`w-full transition-all duration-1000 delay-500 
            ${
            mounted
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          <AnimatedSearchBar />
        </div>

        {/* Animated stats */}
        <div
          className={`w-full transition-all duration-1000 delay-700 ${
            mounted
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          <AnimatedStats />
        </div>
      </div>
    </div>
  );
}
