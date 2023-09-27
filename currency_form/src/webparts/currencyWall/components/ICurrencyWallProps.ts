export interface ICurrencyWallProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currency: Array<any>; 
  description: string;
}

export interface ICurrency {
  ticker?: string;
  bid?: number;
  ask?: number;
  open?: number;
  low?: number; 
  high?:number;
  changes?: number
  date?: Date;
}

export interface ICurrenctCombined extends ICurrencyWallProps, ICurrency {}
