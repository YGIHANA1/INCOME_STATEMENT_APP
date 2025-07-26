import React from 'react';
import { Revenue, Expense } from '../types';
import { FileText, Trash2, Download } from 'lucide-react';

interface ActionButtonsProps {
  revenues: Revenue[];
  expenses: Expense[];
  onClearAll: () => void;
  onExport: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  revenues,
  expenses,
  onClearAll,
  onExport
}) => {
  const hasData = revenues.length > 0 || expenses.length > 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onExport}
          disabled={!hasData}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Download size={18} />
          Export Statement
        </button>
        
        <button
          onClick={onClearAll}
          disabled={!hasData}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Trash2 size={18} />
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;