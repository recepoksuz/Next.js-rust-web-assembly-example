import React, { createContext, useContext, Suspense } from "react";
import { useWebAssembly } from "@/hooks/useWebAssembly";

interface WasmContextType {
  mathModule: any;
  loading: boolean;
  error: string | null;
  inputs: any;
  results: any;
  setA: (value: number) => void;
  setB: (value: number) => void;
  calculateResults: () => void;
}

const WasmContext = createContext<WasmContextType | null>(null);

export const WasmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wasmData = useWebAssembly();

  return (
    <WasmContext.Provider value={wasmData}>
      <Suspense fallback={<div>Loading WebAssembly...</div>}>
        {children}
      </Suspense>
    </WasmContext.Provider>
  );
};

export const useWasm = () => {
  const context = useContext(WasmContext);
  if (!context) {
    throw new Error("useWasm must be used within WasmProvider");
  }
  return context;
};
