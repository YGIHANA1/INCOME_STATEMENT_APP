export interface Revenue {
  id: number;
  description: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
}

export type ExpenseCategory = 
  | 'COGS'
  | 'Operating'
  | 'Marketing'
  | 'Administrative'
  | 'Interest'
  | 'Taxes'
  | 'Depreciation'
  | 'Other';

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  cogs: number;
  operating: number;
  other: number;
  grossProfit: number;
  netIncome: number;
  profitMargin: number;
}