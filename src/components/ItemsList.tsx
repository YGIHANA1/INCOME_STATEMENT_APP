import React from 'react';
import { Revenue, Expense } from '../types';
import { Trash2 } from 'lucide-react';

interface ItemsListProps {
  revenues: Revenue[];
  expenses: Expense[];
  onRemoveRevenue: (id: number) => void;
  onRemoveExpense: (id: number) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  revenues,
  expenses,
  onRemoveRevenue,
  onRemoveExpense
}) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'COGS': 'border-l-orange-500',
      'Operating': 'border-l-purple-500',
      'Marketing': 'border-l-teal-500',
      'Administrative': 'border-l-indigo-500',
      'Interest': 'border-l-yellow-500',
      'Taxes': 'border-l-red-500',
      'Depreciation': 'border-l-gray-500',
      'Other': 'border-l-pink-500'
    };
    return colors[category] || 'border-l-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Revenue Items */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Items</h3>
        {revenues.length === 0 ? (
          <div className="text-center text-gray-400 italic py-5">
            No revenue items added yet
          </div>
        ) : (
          <div className="space-y-2">
            {revenues.map((revenue) => (
              <div
                key={revenue.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-l-blue-500 hover:bg-gray-100 hover:translate-x-1 transition-all duration-200"
              >
                <div>
                  <div className="font-medium text-gray-800">{revenue.description}</div>
                  <div className="text-sm text-gray-600">
                    {revenue.quantity} units × ${revenue.price.toFixed(2)} each
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-green-600 font-mono text-lg">
                    ${revenue.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveRevenue(revenue.id)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expense Items */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense Items</h3>
        {expenses.length === 0 ? (
          <div className="text-center text-gray-400 italic py-5">
            No expense items added yet
          </div>
        ) : (
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 ${getCategoryColor(expense.category)} hover:bg-gray-100 hover:translate-x-1 transition-all duration-200`}
              >
                <div>
                  <div className="font-medium text-gray-800">{expense.description}</div>
                  <div className="text-sm text-gray-600">{expense.category}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-600 font-mono text-lg">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveExpense(expense.id)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsList;