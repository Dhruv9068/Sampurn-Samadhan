import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Leaf, Droplets, Sun, Plus, Camera } from 'lucide-react';
import { useWeatherData } from '../../../hooks/weatherData';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'green' | 'blue' | 'red';
  delay?: number;
}

const colorClasses = {
  green: {
    bg: 'from-green-400 to-green-600',
    icon: 'bg-green-100 text-green-700',
    trend: 'text-green-600',
  },
  blue: {
    bg: 'from-blue-400 to-blue-600',
    icon: 'bg-blue-100 text-blue-700',
    trend: 'text-blue-600',
  },
  red: {
    bg: 'from-red-400 to-red-600',
    icon: 'bg-red-100 text-red-700',
    trend: 'text-red-600',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
  delay = 0,
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      className="bg-cream-50 rounded-xl shadow-lg border border-green-400 p-4 sm:p-6 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
    >
      <div
        className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl ${colors.bg} rounded-full mix-blend-multiply filter blur-xl opacity-20 pointer-events-none`}
      ></div>
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <span className={`p-1 rounded-full ${colors.icon}`}>
              <Icon className="w-4 h-4" />
            </span>
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">
            {value}
          </p>
          {trend && (
            <div className={`flex items-center text-sm ${colors.trend}`}>
              <span>{trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-gray-500 hidden sm:inline">from last month</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AgricultureDashboard: React.FC = () => {
  const weatherData = useWeatherData();

  const croppedStats = [
    {
      title: 'Total Crops',
      value: '24',
      icon: Leaf,
      trend: { value: 12, isPositive: true },
      color: 'green' as const,
    },
    {
      title: 'Healthy Plants',
      value: '22',
      icon: Leaf,
      trend: { value: 5, isPositive: true },
      color: 'green' as const,
    },
    {
      title: 'Disease Detected',
      value: '2',
      icon: Leaf,
      trend: { value: 8, isPositive: false },
      color: 'red' as const,
    },
    {
      title: 'Yield Prediction',
      value: '85%',
      icon: Leaf,
      trend: { value: 15, isPositive: true },
      color: 'blue' as const,
    },
    {
      title: 'Water Usage',
      value: '1,250L',
      icon: Droplets,
      trend: { value: 3, isPositive: true },
      color: 'blue' as const,
    },
    {
      title: 'Soil Quality',
      value: '92%',
      icon: Leaf,
      trend: { value: 7, isPositive: true },
      color: 'red' as const,
    }
  ];

  const recentActivities = [
    { activity: 'Watered tomato plants', time: '2 hours ago', status: 'Completed' },
    { activity: 'Applied fertilizer to corn field', time: '1 day ago', status: 'Completed' },
    { activity: 'Disease detected in wheat crop', time: '2 days ago', status: 'Attention' },
    { activity: 'Harvested lettuce crop', time: '3 days ago', status: 'Completed' },
    { activity: 'Soil analysis completed', time: '4 days ago', status: 'Completed' },
    { activity: 'Pruned apple orchard', time: '1 hour ago', status: 'Completed' },
    { activity: 'Inspected irrigation system', time: '3 hours ago', status: 'Completed' },
    { activity: 'Pest infestation detected in soybean field', time: '5 hours ago', status: 'Attention' },
    { activity: 'Fed livestock in barn A', time: '1 day ago', status: 'Completed' }
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-green-100/50 to-emerald-200/50 rounded-3xl p-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-black text-4xl font-bold mb-4">Welcome back, Farm User!</h2>
              <p className="text-xl text-green-600">Here's your farm summary for today</p>
            </div>
            <div className="text-right">
              <p className="text-5xl text-black font-bold">4</p>
              <p className="text-xl text-green-600 mt-2">Active Crops</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {croppedStats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[70%_30%]'>
        {/* Recent Farm Activities */}
        <div className="bg-green-50 rounded-3xl w-full">
          <div className="pr-8 pl-0 pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-slate-900">Recent Farm Activities</h3>
                <p className="text-xl text-slate-600 mt-2">Track your farming operations</p>
              </div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center space-x-2 text-md">
                <Plus className="w-4 h-4" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>
          <div className="pr-8 pl-0 pt-4">
            <div className="space-y-6">
            {recentActivities.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-cream-50 rounded-xl shadow-md border border-green-200 p-4 lg:p-6 hover:shadow-lg transition-shadow relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">{item.activity}</p>
                        <p className="text-sm text-gray-600">{item.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather and Quick Actions */}
        <div className="grid grid-cols-1 gap-5 mt-4 h-fit">
          {/* Weather Conditions */}
          <div className="bg-green-50 rounded-3xl shadow-sm border border-green-400">
            <div className="bg-gradient-to-br from-green-100/30 to-transparent p-6 border-b border-gray-100">
              <div className='flex flex-row justify-between items-center'>
                <h3 className="text-lg font-bold text-slate-900">Weather Conditions</h3>
                <div className='flex flex-row justify-center items-center gap-1.5 relative top-0.5'>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-0.5"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-1">Current environmental data</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {weatherData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className={`bg-gradient-to-r ${item.bgcolor1} ${item.bgcolor2} rounded-xl p-4 text-center border border-gray-100 hover:scale-105 ease-out`}>
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                      <p className="text-xl font-bold text-slate-900">{item.value.toFixed(1)}{item.unit}</p>
                      <p className="text-sm text-slate-600">{item.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <h4 className="text-lg font-semibold mb-2">Today's Recommendation</h4>
                <p className="text-sm text-green-100">
                  Optimal conditions for watering. Consider applying fertilizer in the evening.
                  Monitor humidity levels for potential fungal issues.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-green-50 rounded-3xl shadow-sm border border-green-400">
            <div className="bg-gradient-to-br from-green-100/30 to-transparent p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              <p className="text-sm text-slate-600 mt-1">Common farm operations</p>
            </div>
            <div className="p-4 pt-0">
              <div className="grid grid-cols-1 gap-4">
                <button className="bg-gradient-to-r from-green-300 to-emerald-400 text-white p-4 rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all flex flex-row items-center space-x-2">
                  <Camera className="w-6 h-6 text-green-600" />
                  <span className="text-sm text-gray-800 font-medium">Scan Crop</span>
                </button>
                <button className="bg-gradient-to-r from-blue-300 to-cyan-400 text-white p-4 rounded-xl hover:from-blue-400 hover:to-cyan-500 transition-all flex flex-row items-center space-x-2">
                  <Droplets className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-gray-800 font-medium">Water Plants</span>
                </button>
                <button className="bg-gradient-to-r from-amber-300 to-orange-400 text-white p-4 rounded-xl hover:from-amber-400 hover:to-orange-500 transition-all flex flex-row items-center space-x-2">
                  <Sun className="w-6 h-6 text-amber-600" />
                  <span className="text-sm text-gray-800 font-medium">Check Soil</span>
                </button>
                <button className="bg-gradient-to-r from-purple-300 to-indigo-400 text-white p-4 rounded-xl hover:from-purple-400 hover:to-indigo-500 transition-all flex flex-row items-center space-x-2">
                  <Plus className="w-6 h-6 text-purple-600" />
                  <span className="text-sm text-gray-800 font-medium">Add Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureDashboard;