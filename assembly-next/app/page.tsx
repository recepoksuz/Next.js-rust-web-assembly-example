"use client";

import { useWebAssembly } from "@/hooks/useWebAssembly";
import {
  LoadingSpinner,
  ErrorMessage,
  InputSection,
  ResultsSection,
  InfoSection,
} from "@/components";
import { MESSAGES } from "@/constants";

export default function Home() {
  const { loading, error, inputs, results, setA, setB, calculateResults } =
    useWebAssembly();

  if (loading) {
    return <LoadingSpinner message={MESSAGES.LOADING} />;
  }

  if (error) {
    return (
      <ErrorMessage error={error} description={MESSAGES.ERROR_CHECK_CONSOLE} />
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
            <InputSection
              inputs={inputs}
              onChangeA={setA}
              onChangeB={setB}
              onCalculate={calculateResults}
            />

            <ResultsSection results={results} />
          </div>

          <InfoSection />
        </div>
      </div>
    </div>
  );
}
