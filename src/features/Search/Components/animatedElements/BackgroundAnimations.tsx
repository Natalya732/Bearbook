import {
  Globe,
  Building2,
  Star,
  Users,
  Sparkles,
  Zap,
  Search,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";

type FloatingIconsForBackgroundProps = {
  icon: any;
  delay: number;
  duration: number;
  position: {
    top: string;
    left: string;
  };
};

const FloatingIconsForBackground = ({
  icon: Icon,
  delay,
  duration,
  position,
}: FloatingIconsForBackgroundProps) => {
  return (
    <div
      className="absolute w-6 h-6 text-blue-400 opacity-60 animate-pulse"
      style={{
        top: position.top,
        left: position.left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Icon className="w-full h-full" />
    </div>
  );
};

const ParticleAnimations = ({
  delay,
  duration,
  position,
}: {
  delay: number;
  duration: number;
  position: { top: string; left: string };
}) => (
  <div
    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40"
    style={{
      top: position.top,
      left: position.left,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

const floatingElements = [
  { icon: Users, delay: 0, duration: 3, position: { top: "10%", left: "10%" } },
  {
    icon: Building2,
    delay: 1,
    duration: 4,
    position: { top: "20%", left: "85%" },
  },
  {
    icon: Globe,
    delay: 2,
    duration: 3.5,
    position: { top: "60%", left: "5%" },
  },
  {
    icon: Sparkles,
    delay: 0.5,
    duration: 2.5,
    position: { top: "80%", left: "90%" },
  },
  {
    icon: Star,
    delay: 1.5,
    duration: 3,
    position: { top: "40%", left: "80%" },
  },
  {
    icon: Zap,
    delay: 0.8,
    duration: 2.8,
    position: { top: "70%", left: "15%" },
  },
];

export const BackgroundAnimations = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {floatingElements.map((item, index) => (
        <FloatingIconsForBackground {...item} key={index} />
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <ParticleAnimations
          key={i}
          delay={Math.random() * 3}
          duration={2 + Math.random() * 3}
          position={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-105" : "scale-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
        <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
          <Search className="w-6 h-6 mr-3 transition-colors duration-300 ${isFocused ? 'text-blue-600' : 'text-gray-400'}" />
          <input
            type="text"
            placeholder="Search for people, companies, or topics..."
            className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button className="ml-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            {" "}
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export const AnimatedStats = () => {
  const [counts, setCounts] = useState({
    users: 0,
    companies: 0,
    connections: 0,
  });

  useEffect(() => {
    const targetCounts = { users: 12500, companies: 850, connections: 45000 };

    const duration = 2000;
    const steps = 80;

    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      const progress = currentStep / steps;

      setCounts({
        users: Math.floor(targetCounts.users * progress),
        companies: Math.floor(targetCounts.companies * progress),
        connections: Math.floor(targetCounts.connections * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-8 mt-8">
      {[
        {
          label: "Active Users",
          count: counts.users,
          icon: Users,
          color: "text-blue-500",
        },
        {
          label: "Companies",
          count: counts.companies,
          icon: Building2,
          color: "text-green-500",
        },
        {
          label: "Connections",
          count: counts.connections,
          icon: Heart,
          color: "text-red-500",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="text-center animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={`${stat.color} mb-2`}>
            <stat.icon className="w-8 h-8 mx-auto" />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            {stat.count.toLocaleString()}+
          </div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
