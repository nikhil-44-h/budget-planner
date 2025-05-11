import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, TrendingDown, Wallet, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { ExpenseChart } from '../components/ExpenseChart';
import { IncomeChart } from '../components/IncomeChart';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const [summary, setSummary] = useState({
    totalIncome: 65000,
    totalExpenses: 38500,
    totalSavings: 26500,
    monthlyBudget: 50000,
    budgetUtilization: 77, // percentage
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'expense', category: 'Rent', amount: 15000, date: '2025-06-05' },
    { id: 2, type: 'income', category: 'Salary', amount: 65000, date: '2025-06-01' },
    { id: 3, type: 'expense', category: 'Groceries', amount: 5600, date: '2025-06-03' },
    { id: 4, type: 'expense', category: 'Utilities', amount: 3200, date: '2025-06-02' },
    { id: 5, type: 'expense', category: 'Entertainment', amount: 2500, date: '2025-06-04' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <span>June 2025</span>
          <ChevronDown size={16} className="text-gray-500 ml-2" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="Total Income" 
          value={summary.totalIncome} 
          icon={<TrendingUp className="h-6 w-6 text-green-500" />} 
          bgColor="bg-green-50" 
          textColor="text-green-600"
        />
        <SummaryCard 
          title="Total Expenses" 
          value={summary.totalExpenses} 
          icon={<TrendingDown className="h-6 w-6 text-red-500" />} 
          bgColor="bg-red-50" 
          textColor="text-red-600" 
        />
        <SummaryCard 
          title="Total Savings" 
          value={summary.totalSavings} 
          icon={<Wallet className="h-6 w-6 text-blue-500" />} 
          bgColor="bg-blue-50" 
          textColor="text-blue-600" 
        />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm">Budget Utilization</p>
              <p className="font-semibold mt-1">{summary.budgetUtilization}%</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              summary.budgetUtilization > 90 ? 'bg-red-100 text-red-700' :
              summary.budgetUtilization > 75 ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {summary.budgetUtilization > 90 ? 'At Risk' :
               summary.budgetUtilization > 75 ? 'Caution' : 'On Track'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                summary.budgetUtilization > 90 ? 'bg-red-500' :
                summary.budgetUtilization > 75 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} 
              style={{ width: `${summary.budgetUtilization}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formatCurrency(summary.totalExpenses)} of {formatCurrency(summary.monthlyBudget)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
          <div className="h-64">
            <ExpenseChart />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h2>
          <div className="h-64">
            <IncomeChart />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, bgColor, textColor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-gray-500 text-sm">{title}</p>
          <p className={`text-xl font-semibold mt-1 ${textColor}`}>{formatCurrency(value)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;