import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpenseChart: React.FC = () => {
  // Mock data
  const data = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transportation', 'Others'],
    datasets: [
      {
        data: [15000, 5600, 3200, 2500, 2100, 10100],
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#6B7280', // gray
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString('en-IN')}`;
          }
        }
      }
    },
  };

  return <Pie data={data} options={options} />;
};