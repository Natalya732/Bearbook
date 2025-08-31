import { BookOpen } from 'lucide-react';

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed = false }: LogoProps) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md border border-blue-500/20">
        <BookOpen className="w-7 h-7 text-white" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 tracking-tight">BearBook</span>
        <span className="text-xs text-gray-500 font-medium">Connect & Share</span>
      </div>
    </div>
  );
}
