import { useState, useEffect } from "react";
import type {
  MathModule,
  CalculationResults,
  CalculatorInputs,
} from "@/types/wasm";
import { DEFAULT_VALUES, MESSAGES } from "@/constants";

interface UseWebAssemblyReturn {
  mathModule: MathModule | null;
  loading: boolean;
  error: string | null;
  inputs: CalculatorInputs;
  results: CalculationResults;
  setA: (value: number) => void;
  setB: (value: number) => void;
  calculateResults: () => void;
}

export const useWebAssembly = (): UseWebAssemblyReturn => {
  const [mathModule, setMathModule] = useState<MathModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_VALUES);
  const [results, setResults] = useState<CalculationResults>({
    add: 0,
    sub: 0,
    mul: 0,
    div: 0,
    mod: 0,
  });

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Import from the copied wasm-pkg directory
        const wasmModule = await import("../wasm-pkg");
        await wasmModule.default();
        setMathModule(wasmModule as unknown as MathModule);
        setLoading(false);
      } catch (err) {
        setError(`${MESSAGES.ERROR_LOAD}: ${err}`);
        setLoading(false);
        console.error("WASM loading error:", err);
      }
    };

    loadWasm();
  }, []);

  const setA = (value: number) => {
    setInputs((prev) => ({ ...prev, a: value }));
  };

  const setB = (value: number) => {
    setInputs((prev) => ({ ...prev, b: value }));
  };

  const calculateResults = () => {
    if (!mathModule) return;

    const { a, b } = inputs;

    setResults({
      add: mathModule.add(a, b),
      sub: mathModule.sub(a, b),
      mul: mathModule.mul(a, b),
      div: mathModule.div(a, b),
      mod: mathModule.mod_op(a, b),
    });

    mathModule.greet(MESSAGES.GREET_USER);
  };

  return {
    mathModule,
    loading,
    error,
    inputs,
    results,
    setA,
    setB,
    calculateResults,
  };
};
