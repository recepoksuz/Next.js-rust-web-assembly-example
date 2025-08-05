import type { CalculatorInputs } from "@/types/wasm";

interface InputSectionProps {
  inputs: CalculatorInputs;
  onChangeA: (value: number) => void;
  onChangeB: (value: number) => void;
  onCalculate: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  inputs,
  onChangeA,
  onChangeB,
  onCalculate,
}) => (
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
          value={inputs.a}
          onChange={(e) => onChangeA(parseInt(e.target.value) || 0)}
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
          value={inputs.b}
          onChange={(e) => onChangeB(parseInt(e.target.value) || 0)}
          className="w-full px-4 py-3 text-lg font-semibold text-black border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:border-gray-400"
        />
      </div>

      <button
        onClick={onCalculate}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        🚀 Calculate with Web Assembly
      </button>
    </div>
  </div>
);
