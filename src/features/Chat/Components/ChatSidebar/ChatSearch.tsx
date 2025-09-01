import { useState } from "react";
import { Search } from "lucide-react";

export default function ChatSearch() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`w-full p-2 border border-gray-400 rounded-3xl flex items-center gap-2 font-semibold text-gray-500
    ${isFocused ? " border-blue-500" : ""}`}
    >
      <Search
        className={`w-5 h-5 font-bold ${
          isFocused ? "text-blue-500" : "text-gray-500"
        }`}
      />
      <input
        type="text"
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full outline-none border-none
    `}
      />
    </div>
  );
}
