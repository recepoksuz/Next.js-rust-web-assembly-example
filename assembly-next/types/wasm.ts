export interface MathModule {
  greet: (name: string) => void;
  add: (a: number, b: number) => number;
  sub: (a: number, b: number) => number;
  mul: (a: number, b: number) => number;
  div: (a: number, b: number) => number;
}

export interface CalculationResults {
  add: number;
  sub: number;
  mul: number;
  div: number;
}

export interface CalculatorInputs {
  a: number;
  b: number;
}
