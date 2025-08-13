import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Leaf, Droplets, Sun, BarChart3 } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const AgricultureAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Sample data for charts
  const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const yieldData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Crop Yield (tons)',
        data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const weatherData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [22, 24, 26, 28, 30, 32, 35, 33, 30, 28],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(249, 115, 22)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Rainfall (mm)',
        data: [45, 52, 38, 65, 72, 85, 92, 78, 65, 58],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const cropHealthData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Healthy Crops (%)',
        data: [85, 88, 92, 89, 94, 96, 93, 97, 95, 98],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
  };

  const stats = [
    {
      title: 'Avg Yield',
      value: '28.5 tons',
      trend: 15.2,
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Water Usage',
      value: '1,250L',
      trend: -8.1,
      icon: Droplets,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Crop Health',
      value: '95%',
      trend: 12.3,
      icon: Sun,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Farm Analytics</h2>
          <p className="text-slate-600">Analyze your farm data and yield predictions</p>
        </div>
        
        <div className="flex items-center space-x-3 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          <Calendar className="w-5 h-5 text-slate-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="border-0 bg-transparent focus:ring-0 text-slate-700 font-medium"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    {stat.trend > 0 ? (
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{stat.trend}%
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-sm font-medium">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        {stat.trend}%
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-900">Crop Yield Trends</h3>
            <p className="text-slate-600 text-sm mt-1">Track your harvest productivity</p>
          </div>
          <div className="p-6">
            <Line data={yieldData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-900">Weather Patterns</h3>
            <p className="text-slate-600 text-sm mt-1">Monitor environmental conditions</p>
          </div>
          <div className="p-6">
            <Line data={weatherData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-900">Crop Health Analysis</h3>
            <p className="text-slate-600 text-sm mt-1">Monitor the health percentage of your crops</p>
          </div>
          <div className="p-6">
            <Bar data={cropHealthData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-slate-900">AI Insights & Recommendations</h3>
          <p className="text-slate-600 text-sm mt-1">Data-driven suggestions for your farm</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Yield Optimization</h4>
                  <p className="text-green-700 text-sm">
                    Your crop yield has increased by 15% this season. Consider expanding cultivation area for tomatoes and corn based on current performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Water Management</h4>
                  <p className="text-blue-700 text-sm">
                    Water usage has decreased by 8% while maintaining crop health. Current irrigation schedule is optimal for the season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureAnalytics;