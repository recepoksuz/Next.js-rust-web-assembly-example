"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mathModule, setMathModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [a, setA] = useState(10);
  const [b, setB] = useState(5);
  const [results, setResults] = useState({
    add: 0,
    sub: 0,
    mul: 0,
    div: 0,
  });

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Import the Web Assembly module
        const wasmModule = await import("math");
        await wasmModule.default();
        setMathModule(wasmModule);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load Web Assembly module: ${err}`);
        setLoading(false);
        console.error("WASM loading error:", err);
      }
    };

    loadWasm();
  }, []);

  const calculateResults = () => {
    if (!mathModule) return;

    setResults({
      add: mathModule.add(a, b),
      sub: mathModule.sub(a, b),
      mul: mathModule.mul(a, b),
      div: mathModule.div(a, b),
    });

    // Call the greet function
    mathModule.greet("Web Assembly User!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading Web Assembly module...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <p className="text-gray-600">
            Check the browser console for more details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Web Assembly Math Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Perform mathematical operations using Rust compiled to Web Assembly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🔢 Input Values
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="a"
                    className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide"
                  >
                    First Number (a)
                  </label>
                  <input
                    id="a"
                    type="number"
                    value={a}
                    onChange={(e) => setA(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 text-lg font-semibold text-black border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="b"
                    className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide"
                  >
                    Second Number (b)
                  </label>
                  <input
                    id="b"
                    type="number"
                    value={b}
                    onChange={(e) => setB(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 text-lg font-semibold text-black border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-400"
                  />
                </div>

                <button
                  onClick={calculateResults}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  🚀 Calculate with Web Assembly
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                📊 Results
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <h3 className="text-sm font-bold text-green-800 mb-2 uppercase tracking-wide">
                    ➕ Addition
                  </h3>
                  <p className="text-3xl font-bold text-green-700">
                    {results.add}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">
                    ➖ Subtraction
                  </h3>
                  <p className="text-3xl font-bold text-blue-700">
                    {results.sub}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <h3 className="text-sm font-bold text-purple-800 mb-2 uppercase tracking-wide">
                    ✖️ Multiplication
                  </h3>
                  <p className="text-3xl font-bold text-purple-700">
                    {results.mul}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200">
                  <h3 className="text-sm font-bold text-orange-800 mb-2 uppercase tracking-wide">
                    ➗ Division
                  </h3>
                  <p className="text-3xl font-bold text-orange-700">
                    {results.div}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              ⚡ How it works
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This calculator uses{" "}
              <span className="font-semibold text-blue-600">Rust code</span>{" "}
              compiled to{" "}
              <span className="font-semibold text-purple-600">
                Web Assembly
              </span>{" "}
              for high-performance mathematical operations. The calculations are
              performed at{" "}
              <span className="font-semibold text-green-600">
                native code speed
              </span>{" "}
              while running in the browser.
            </p>
          </div>

          {/* Developer Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-100 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600 text-sm mb-2">
              💻 Developed by{" "}
              <span className="font-bold text-gray-800">Recep Öksüz</span>
            </p>
            <a
              href="https://github.com/recepoksuz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 hover:underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/recepoksuz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
