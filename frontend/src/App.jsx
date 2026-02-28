import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);

  const targetScore = 86;
  const radius = 36; // smaller radius
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= targetScore) {
        start = targetScore;
        clearInterval(interval);
      }
      setScore(start);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold shadow">
              R
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              ResumeAI
            </h1>
          </div>

          <div className="flex items-center gap-10 text-gray-600 font-medium">
            <span className="hover:text-blue-600 cursor-pointer transition">Tools</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Resume</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Blog</span>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
              My Account
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-2 items-center gap-20">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              ATS Resume Checker:
              <br />
              Score Your Resume Online
            </h1>

            <p className="mt-8 text-blue-100 text-xl max-w-xl leading-relaxed">
              Upload your resume and receive a detailed ATS compatibility score
              with actionable improvement suggestions.
            </p>

            <button className="mt-12 bg-yellow-400 text-black px-12 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition transform hover:scale-105">
              Check Your Resume
            </button>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative flex justify-center items-center text-gray-800">

            {/* Resume Image */}
            <img
              src="/resume_template.png"
              alt="Resume Template"
              className="w-[300px] rounded-2xl shadow-2xl z-10 opacity-90"
            />

            {/* Smaller & Better Positioned Score Circle */}
            <div className="absolute left-12 bottom-60 bg-white p-2 rounded-full shadow-lg z-20">

              <div className="relative w-[95px] h-[95px] flex items-center justify-center">

                <svg width="95" height="95" className="-rotate-90">
                  <circle
                    cx="47.5"
                    cy="47.5"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="47.5"
                    cy="47.5"
                    r={radius}
                    stroke="#16a34a"
                    strokeWidth="7"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                  />
                </svg>

                <div className="absolute flex flex-col items-center">
                  <span className="text-lg font-semibold">
                    {score}
                  </span>
                  <span className="text-[10px] text-green-600 font-medium">
                    Good
                  </span>
                </div>

              </div>
            </div>

            {/* Smaller Status Pills */}
            <div className="absolute right-5 top-28 flex flex-col gap-3 z-20">

              <div className="bg-white text-gray-800 shadow rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Skills
              </div>

              <div className="bg-white text-gray-800 shadow rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Education
              </div>

              <div className="bg-white text-gray-800 shadow rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Work History
              </div>

              <div className="bg-white text-gray-800 shadow rounded-full px-4 py-1.5 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Summary
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default App;