import React, { useState } from 'react';
import { Plus, Filter, Calendar, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface Income {
  id: number;
  source: string;
  amount: number;
  date: string;
  description: string;
  recurring: boolean;
}

const Income: React.FC = () => {
  // Mock data
  const [incomes, setIncomes] = useState<Income[]>([
    { 
      id: 1, 
      source: 'Salary', 
      amount: 65000, 
      date: '2025-06-01', 
      description: 'Monthly salary',
      recurring: true
    },
    { 
      id: 2, 
      source: 'Freelance', 
      amount: 15000, 
      date: '2025-06-10', 
      description: 'Website development project',
      recurring: false
    },
    { 
      id: 3, 
      source: 'Investments', 
      amount: 5000, 
      date: '2025-06-15', 
      description: 'Dividend income',
      recurring: true
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newIncome, setNewIncome] = useState<Omit<Income, 'id'>>({
    source: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    description: '',
    recurring: false,
  });

  const sources = ['Salary', 'Freelance', 'Business', 'Investments', 'Rent', 'Interest', 'Gift', 'Others'];

  const handleAddIncome = () => {
    if (!newIncome.source || newIncome.amount <= 0 || !newIncome.date) {
      alert('Please fill all required fields');
      return;
    }

    const incomeToAdd = {
      ...newIncome,
      id: incomes.length ? Math.max(...incomes.map(i => i.id)) + 1 : 1,
    };

    setIncomes([incomeToAdd, ...incomes]);
    setIsAddModalOpen(false);
    setNewIncome({
      source: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: '',
      recurring: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Income</h1>
        
        <div className="flex space-x-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span>June 2025</span>
            <ChevronDown size={16} className="text-gray-500 ml-2" />
          </div>
          
          <button className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span>Filter</span>
          </button>
          
          <button 
            className="flex items-center bg-green-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-green-700 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            <span>Add Income</span>
          </button>
        </div>
      </div>

      {/* Income Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incomes.map((income) => (
                <tr key={income.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(income.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {income.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {income.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {income.recurring ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 text-right">
                    +{formatCurrency(income.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Income Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Income</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  Source*
                </label>
                <select
                  id="source"
                  value={newIncome.source}
                  onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select a source</option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹)*
                </label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newIncome.amount || ''}
                  onChange={(e) => setNewIncome({...newIncome, amount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <input
                  id="date"
                  type="date"
                  value={newIncome.date}
                  onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={newIncome.description}
                  onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter a description"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="recurring"
                  type="checkbox"
                  checked={newIncome.recurring}
                  onChange={(e) => setNewIncome({...newIncome, recurring: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                  Recurring income
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddIncome}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;