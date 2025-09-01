import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="absolute bottom-10 left-40 right-40">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-sm opacity-80 animate-pulse"></div>
      <div className="relative flex gap-3 items-center w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
        <input
          type="text"
          placeholder="Start typing..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full rounded-3xl p-3 outline-none border-none"
        />
        <div className="p-2 absolute right-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:scale-105 transition-all duration-300 cursor-pointer">
          <Send className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
