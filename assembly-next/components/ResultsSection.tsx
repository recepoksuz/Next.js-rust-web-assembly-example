import type { CalculationResults } from "@/types/wasm";

interface ResultsSectionProps {
  results: CalculationResults;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      📊 Results
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-bold text-green-800 mb-2 uppercase tracking-wide">
          ➕ Addition
        </h3>
        <p className="text-3xl font-bold text-green-700">{results.add}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">
          ➖ Subtraction
        </h3>
        <p className="text-3xl font-bold text-blue-700">{results.sub}</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-bold text-purple-800 mb-2 uppercase tracking-wide">
          ✖️ Multiplication
        </h3>
        <p className="text-3xl font-bold text-purple-700">{results.mul}</p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-bold text-orange-800 mb-2 uppercase tracking-wide">
          ➗ Division
        </h3>
        <p className="text-3xl font-bold text-orange-700">{results.div}</p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 shadow-md hover:shadow-lg transition-all duration-200 md:col-span-1 col-span-2">
        <h3 className="text-sm font-bold text-red-800 mb-2 uppercase tracking-wide">
          📐 Modulus
        </h3>
        <p className="text-3xl font-bold text-red-700">{results.mod}</p>
      </div>
    </div>
  </div>
);
