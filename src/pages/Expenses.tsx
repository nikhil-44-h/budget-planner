import React, { useState } from 'react';
import { Plus, Filter, Calendar, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod: string;
}

const Expenses: React.FC = () => {
  // Mock data
  const [expenses, setExpenses] = useState<Expense[]>([
    { 
      id: 1, 
      category: 'Housing', 
      amount: 15000, 
      date: '2025-06-01', 
      description: 'Monthly rent payment',
      paymentMethod: 'Bank Transfer'
    },
    { 
      id: 2, 
      category: 'Groceries', 
      amount: 5600, 
      date: '2025-06-03', 
      description: 'Weekly grocery shopping',
      paymentMethod: 'Credit Card'
    },
    { 
      id: 3, 
      category: 'Utilities', 
      amount: 3200, 
      date: '2025-06-05', 
      description: 'Electricity and water bill',
      paymentMethod: 'UPI'
    },
    { 
      id: 4, 
      category: 'Entertainment', 
      amount: 2500, 
      date: '2025-06-07', 
      description: 'Movie tickets and dinner',
      paymentMethod: 'Credit Card'
    },
    { 
      id: 5, 
      category: 'Transportation', 
      amount: 2100, 
      date: '2025-06-10', 
      description: 'Fuel and cab rides',
      paymentMethod: 'UPI'
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    category: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    description: '',
    paymentMethod: '',
  });

  const categories = [
    'Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment', 
    'Healthcare', 'Education', 'Shopping', 'Personal Care', 'Others'
  ];

  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Others'];

  const handleAddExpense = () => {
    if (!newExpense.category || newExpense.amount <= 0 || !newExpense.date) {
      alert('Please fill all required fields');
      return;
    }

    const expenseToAdd = {
      ...newExpense,
      id: expenses.length ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
    };

    setExpenses([expenseToAdd, ...expenses]);
    setIsAddModalOpen(false);
    setNewExpense({
      category: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: '',
      paymentMethod: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        
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
            className="flex items-center bg-blue-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-blue-700 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(expense.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 text-right">
                    -{formatCurrency(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Expense</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  value={newExpense.amount || ''}
                  onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
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
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
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
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter a description"
                />
              </div>
              
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={newExpense.paymentMethod}
                  onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select payment method</option>
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
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
                onClick={handleAddExpense}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;