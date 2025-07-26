import React from 'react';
import Header from './components/Header';
import RevenueForm from './components/RevenueForm';
import ExpenseForm from './components/ExpenseForm';
import ItemsList from './components/ItemsList';
import FinancialSummary from './components/FinancialSummary';
import ActionButtons from './components/ActionButtons';
import { useFinancialCalculator } from './hooks/useFinancialCalculator';

function App() {
  const {
    revenues,
    expenses,
    summary,
    addRevenue,
    addExpense,
    removeRevenue,
    removeExpense,
    clearAll,
    exportStatement
  } = useFinancialCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
      <div className="container mx-auto px-5 py-8 max-w-7xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Forms and Items */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueForm onAddRevenue={addRevenue} />
            <ExpenseForm onAddExpense={addExpense} />
            <ItemsList
              revenues={revenues}
              expenses={expenses}
              onRemoveRevenue={removeRevenue}
              onRemoveExpense={removeExpense}
            />
          </div>
          
          {/* Right Column - Summary and Actions */}
          <div className="space-y-6">
            <FinancialSummary summary={summary} />
            <ActionButtons
              revenues={revenues}
              expenses={expenses}
              onClearAll={clearAll}
              onExport={exportStatement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;