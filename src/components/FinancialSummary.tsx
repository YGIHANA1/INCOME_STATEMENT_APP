import React from 'react';
import { FinancialSummary as Summary } from '../types';

interface FinancialSummaryProps {
  summary: Summary;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summary }) => {
  const getProfitIndicator = () => {
    if (summary.netIncome > 0) {
      return {
        message: `Profit: $${summary.netIncome.toFixed(2)}`,
        color: 'text-green-600',
        bgColor: 'bg-gradient-to-r from-green-500 to-green-400',
        width: Math.min((summary.netIncome / summary.totalRevenue) * 100, 100)
      };
    } else if (summary.netIncome < 0) {
      return {
        message: `Loss: $${Math.abs(summary.netIncome).toFixed(2)}`,
        color: 'text-red-600',
        bgColor: 'bg-gradient-to-r from-red-500 to-red-400',
        width: Math.min((Math.abs(summary.netIncome) / summary.totalRevenue) * 100, 100)
      };
    } else {
      return {
        message: 'Break Even',
        color: 'text-gray-600',
        bgColor: 'bg-gradient-to-r from-gray-500 to-gray-400',
        width: 0
      };
    }
  };

  const indicator = getProfitIndicator();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 sticky top-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Income Statement Summary</h2>
      <p className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 text-sm text-gray-600 rounded italic">
        Net Profit/Loss = Total Revenue - Total Expenses
      </p>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-3 text-lg">
          <span className="font-medium text-gray-600">Total Revenue:</span>
          <span className="font-semibold text-green-600 font-mono">
            ${summary.totalRevenue.toFixed(2)}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Cost of Goods Sold:</span>
            <span className="font-semibold text-red-600 font-mono">
              ${summary.cogs.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Operating Expenses:</span>
            <span className="font-semibold text-red-600 font-mono">
              ${summary.operating.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Other Expenses:</span>
            <span className="font-semibold text-red-600 font-mono">
              ${summary.other.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 text-lg">
          <span className="font-medium text-gray-600">Total Expenses:</span>
          <span className="font-semibold text-red-600 font-mono">
            ${summary.totalExpenses.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-3 text-lg">
          <span className="font-medium text-gray-600">Gross Profit:</span>
          <span className={`font-semibold font-mono ${summary.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.grossProfit.toFixed(2)}
          </span>
        </div>
        
        <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded my-4"></div>
        
        <div className="flex justify-between items-center py-4 text-xl font-bold">
          <span className="text-gray-600">Net Income (Profit/Loss):</span>
          <span className={`font-mono ${summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.netIncome.toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 text-gray-600 border-t border-gray-200 pt-3">
          <span className="font-medium">Profit Margin:</span>
          <span className={`font-semibold ${summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {summary.profitMargin.toFixed(2)}%
          </span>
        </div>
        
        <div className="mt-6 text-center">
          <div className={`text-xl font-semibold mb-3 ${indicator.color}`}>
            {indicator.message}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${indicator.bgColor} transition-all duration-500 ease-out`}
              style={{ width: `${indicator.width}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;