import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white">
      <div className="p-4 text-lg font-bold border-b border-blue-700">
        Dashboard
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <a href="./link" className="block p-3 hover:bg-blue-700 rounded">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 hover:bg-blue-700 rounded">
              Feed
            </a>
          </li>
          <li>
            <a href="#" className="block p-3 hover:bg-blue-700 rounded">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
