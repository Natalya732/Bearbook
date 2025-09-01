import React from "react";
import {
  Heart,
  Code,
  Users,
  MessageSquare,
  Search,
  Zap,
  PaintBucket,
  Server,
  Building,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">BearBook</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A clean, developer-first social media platform where content takes
            center stage. Built for creators who want to showcase their work
            without the noise.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
              What is BearBook?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              BearBook is a clean and developer-first social media web app
              focused on content showcasing rather than messaging. We believe in
              the power of simplicity and meaningful connections through shared
              content.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Built with modern technologies like TypeScript, Vite, Supabase,
              and ShadCN/UI, BearBook emphasizes essential features like
              posting, following, and unfollowing — without the clutter of
              real-time chat.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Clean Social Experience
                </h3>
              </div>
              <p className="text-gray-600">
                Focus on what matters most - your content and your community. No
                overwhelming feeds or unnecessary distractions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Developer-First
                </h3>
              </div>
              <p className="text-gray-600">
                Built with modern tech stack that developers love. TypeScript,
                Vite, and Supabase power a smooth, reliable experience.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Content-Focused
                </h3>
              </div>
              <p className="text-gray-600">
                Share your projects, ideas, and creations with a community that
                values quality content over quantity.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Lightning Fast
                </h3>
              </div>
              <p className="text-gray-600">
                Optimized for speed and performance. Built with Vite for instant
                hot reloads and fast builds.
              </p>
            </div>
          </div>

   
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? I'd love to
            hear from you! BearBook is a passion project, and your feedback
            helps make it better.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:contact@bearbook.dev"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://github.com/yourusername/bearbook"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View on GitHub
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              Made with ❤️ by a developer, for developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
