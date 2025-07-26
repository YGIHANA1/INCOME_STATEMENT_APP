import { useState, useMemo } from 'react';
import { Revenue, Expense, FinancialSummary } from '../types';

export const useFinancialCalculator = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addRevenue = (revenueData: Omit<Revenue, 'id'>) => {
    const newRevenue: Revenue = {
      ...revenueData,
      id: Date.now()
    };
    setRevenues(prev => [...prev, newRevenue]);
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const removeRevenue = (id: number) => {
    setRevenues(prev => prev.filter(revenue => revenue.id !== id));
  };

  const removeExpense = (id: number) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const clearAll = () => {
    if (revenues.length === 0 && expenses.length === 0) {
      alert('No data to clear');
      return;
    }
    
    if (window.confirm('Are you sure you want to clear all revenue and expense data?')) {
      setRevenues([]);
      setExpenses([]);
    }
  };

  const summary: FinancialSummary = useMemo(() => {
    const totalRevenue = revenues.reduce((sum, revenue) => sum + revenue.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const cogs = expenses
      .filter(e => e.category === 'COGS')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const operating = expenses
      .filter(e => ['Operating', 'Administrative'].includes(e.category))
      .reduce((sum, e) => sum + e.amount, 0);
    
    const other = expenses
      .filter(e => ['Marketing', 'Interest', 'Taxes', 'Depreciation', 'Other'].includes(e.category))
      .reduce((sum, e) => sum + e.amount, 0);
    
    const grossProfit = totalRevenue - cogs;
    const netIncome = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      totalExpenses,
      cogs,
      operating,
      other,
      grossProfit,
      netIncome,
      profitMargin
    };
  }, [revenues, expenses]);

  const exportStatement = () => {
    let statement = 'INCOME STATEMENT\n';
    statement += '================\n\n';
    statement += 'REVENUE:\n';
    statement += '--------\n';
    
    if (revenues.length === 0) {
      statement += 'No revenue items\n';
    } else {
      revenues.forEach(revenue => {
        statement += `${revenue.description}: ${revenue.quantity} units × $${revenue.price.toFixed(2)} = $${revenue.amount.toFixed(2)}\n`;
      });
    }
    
    statement += `\nTotal Revenue: $${summary.totalRevenue.toFixed(2)}\n\n`;
    
    statement += 'EXPENSES:\n';
    statement += '---------\n';
    
    if (expenses.length === 0) {
      statement += 'No expense items\n';
    } else {
      const expensesByCategory: Record<string, Expense[]> = {};
      expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
          expensesByCategory[expense.category] = [];
        }
        expensesByCategory[expense.category].push(expense);
      });
      
      Object.keys(expensesByCategory).forEach(category => {
        statement += `\n${category}:\n`;
        expensesByCategory[category].forEach(expense => {
          statement += `  ${expense.description}: $${expense.amount.toFixed(2)}\n`;
        });
      });
    }
    
    statement += `\nTotal Expenses: $${summary.totalExpenses.toFixed(2)}\n\n`;
    
    statement += 'CALCULATIONS:\n';
    statement += '-------------\n';
    statement += `Cost of Goods Sold (COGS): $${summary.cogs.toFixed(2)}\n`;
    statement += `Gross Profit (Revenue - COGS): $${summary.grossProfit.toFixed(2)}\n\n`;
    
    statement += 'SUMMARY:\n';
    statement += '--------\n';
    statement += `Net Income: $${summary.netIncome.toFixed(2)}\n`;
    statement += `Profit Margin: ${summary.profitMargin.toFixed(2)}%\n`;
    
    if (summary.netIncome > 0) {
      statement += 'Status: PROFIT\n';
    } else if (summary.netIncome < 0) {
      statement += 'Status: LOSS\n';
    } else {
      statement += 'Status: BREAK EVEN\n';
    }
    
    statement += `\nGenerated on: ${new Date().toLocaleDateString()}\n`;
    
    // Create and download file
    const blob = new Blob([statement], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `income-statement-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return {
    revenues,
    expenses,
    summary,
    addRevenue,
    addExpense,
    removeRevenue,
    removeExpense,
    clearAll,
    exportStatement
  };
};