import React, { useState } from 'react';
import { Revenue } from '../types';

interface RevenueFormProps {
  onAddRevenue: (revenue: Omit<Revenue, 'id'>) => void;
}

const RevenueForm: React.FC<RevenueFormProps> = ({ onAddRevenue }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const total = quantity * price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || quantity <= 0 || price <= 0) {
      alert('Please enter valid description, quantity, and price for revenue');
      return;
    }

    onAddRevenue({
      description: description.trim(),
      quantity,
      price,
      amount: total
    });

    // Reset form
    setDescription('');
    setQuantity(1);
    setPrice(0);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Revenue Sources</h2>
      <p className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 text-sm text-gray-600 rounded italic">
        Formula: Revenue = Quantity Sold × Price Per Unit
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Product Sales, Service Revenue"
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block mb-2 font-medium text-gray-600">Quantity Sold</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              step="1"
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-600">Price Per Unit ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
              step="0.01"
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-600">Total Amount ($)</label>
            <input
              type="number"
              value={total.toFixed(2)}
              readOnly
              className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium uppercase tracking-wide hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Add Revenue
        </button>
      </form>
    </div>
  );
};

export default RevenueForm;