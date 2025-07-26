import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [category, setCategory] = useState<ExpenseCategory>('COGS');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || amount <= 0) {
      alert('Please enter a valid description and amount for expense');
      return;
    }

    onAddExpense({
      category,
      description: description.trim(),
      amount
    });

    // Reset form
    setDescription('');
    setAmount(0);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Business Expenses</h2>
      <p className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 text-sm text-gray-600 rounded italic">
        Include: COGS, Operating Expenses, Marketing, Interest, Taxes, etc.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Expense Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          >
            <option value="COGS">Cost of Goods Sold (COGS)</option>
            <option value="Operating">Operating Expenses</option>
            <option value="Marketing">Marketing & Advertising</option>
            <option value="Administrative">Administrative</option>
            <option value="Interest">Interest & Finance</option>
            <option value="Taxes">Taxes</option>
            <option value="Depreciation">Depreciation</option>
            <option value="Other">Other Expenses</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-600">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Office Rent, Raw Materials, Utilities"
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium text-gray-600">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            step="0.01"
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;