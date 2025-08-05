export const InfoSection: React.FC = () => (
  <>
    <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
        ⚡ How it works
      </h3>
      <p className="text-gray-700 leading-relaxed">
        This calculator uses{" "}
        <span className="font-semibold text-blue-600">Rust code</span> compiled
        to <span className="font-semibold text-purple-600">Web Assembly</span>{" "}
        for high-performance mathematical operations. The calculations are
        performed at{" "}
        <span className="font-semibold text-green-600">native code speed</span>{" "}
        while running in the browser.
      </p>
    </div>

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
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        github.com/recepoksuz
      </a>
    </div>
  </>
);
