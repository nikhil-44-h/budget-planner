import React, { useState } from 'react';
import { Plus, Calendar, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const SavingsGoals: React.FC = () => {
  // Mock data
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      targetAmount: 300000, 
      currentAmount: 150000, 
      deadline: '2025-12-31', 
      category: 'Emergency',
    },
    { 
      id: 2, 
      name: 'New Laptop', 
      targetAmount: 90000, 
      currentAmount: 45000, 
      deadline: '2025-09-30', 
      category: 'Electronics',
    },
    { 
      id: 3, 
      name: 'Vacation', 
      targetAmount: 150000, 
      currentAmount: 35000, 
      deadline: '2026-03-31', 
      category: 'Travel',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<SavingsGoal, 'id'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10),
    category: '',
  });

  const categories = ['Emergency', 'Travel', 'Education', 'Electronics', 'Vehicle', 'Home', 'Others'];

  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.deadline || !newGoal.category) {
      alert('Please fill all required fields');
      return;
    }

    if (newGoal.currentAmount > newGoal.targetAmount) {
      alert('Current amount cannot be greater than target amount');
      return;
    }

    const goalToAdd = {
      ...newGoal,
      id: savingsGoals.length ? Math.max(...savingsGoals.map(g => g.id)) + 1 : 1,
    };

    setSavingsGoals([...savingsGoals, goalToAdd]);
    setIsAddModalOpen(false);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10),
      category: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
        
        <div className="flex space-x-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span>June 2025</span>
            <ChevronDown size={16} className="text-gray-500 ml-2" />
          </div>
          
          <button 
            className="flex items-center bg-yellow-500 text-white rounded-lg px-3 py-2 text-sm hover:bg-yellow-600 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>

      {/* Savings Goals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{goal.name}</h3>
                  <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {goal.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600">{daysLeft}</span> days left
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due by {new Date(goal.deadline).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(goal.currentAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Target</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 text-center py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  Add Funds
                </button>
                <button className="flex-1 text-center py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Savings Goal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Savings Goal</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Name*
                </label>
                <input
                  id="name"
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Emergency Fund"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
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
                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount (₹)*
                </label>
                <input
                  id="targetAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newGoal.targetAmount || ''}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Amount (₹)
                </label>
                <input
                  id="currentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newGoal.currentAmount || ''}
                  onChange={(e) => setNewGoal({...newGoal, currentAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date*
                </label>
                <input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
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
                onClick={handleAddGoal}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoals;