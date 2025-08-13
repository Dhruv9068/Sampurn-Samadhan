import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, Heart, Activity, Droplets } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { db, COLLECTIONS, FirebaseHealthRecord } from '../../../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Analytics: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState<FirebaseHealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db!, COLLECTIONS.HEALTH_RECORDS),
      (snapshot) => {
        const records: FirebaseHealthRecord[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as FirebaseHealthRecord;
          records.push({ ...data, id: doc.id });
        });
        setHealthRecords(records.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
        setLoading(false);
      },
      (error) => {
        console.error('Error loading health records:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getFilteredRecords = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return healthRecords
      .filter(record => new Date(record.date) >= cutoffDate)
      .filter(record => !selectedUserId || record.userId === selectedUserId);
  };

  const filteredRecords = getFilteredRecords();

  // Get unique user IDs for the dropdown
  const uniqueUserIds = Array.from(new Set(healthRecords.map(record => record.userId)));

  // Prepare chart data
  const chartLabels = filteredRecords.slice(0, 10).reverse().map(record => 
    new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );

  const heartRateData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: filteredRecords.slice(0, 10).reverse().map(record => record.heartRate || null),
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

  const bloodPressureData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Systolic',
        data: filteredRecords.slice(0, 10).reverse().map(record => record.bloodPressure?.systolic || null),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: 'Diastolic',
        data: filteredRecords.slice(0, 10).reverse().map(record => record.bloodPressure?.diastolic || null),
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgb(6, 182, 212)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const sleepData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Sleep Hours',
        data: filteredRecords.slice(0, 10).reverse().map(record => record.sleepHours || null),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
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

  // Calculate averages and trends
  const calculateAverage = (field: keyof FirebaseHealthRecord) => {
    const values = filteredRecords
      .map(record => record[field] as number)
      .filter(value => value !== undefined && value !== null);
    
    return values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : 'N/A';
  };

  const calculateTrend = (field: keyof FirebaseHealthRecord) => {
    const values = filteredRecords
      .map(record => record[field] as number)
      .filter(value => value !== undefined && value !== null);
    
    if (values.length < 2) return 0;
    
    const recent = values.slice(0, Math.ceil(values.length / 2));
    const older = values.slice(Math.ceil(values.length / 2));
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    return ((recentAvg - olderAvg) / olderAvg * 100).toFixed(1);
  };

  const stats = [
    {
      title: 'Avg Heart Rate',
      value: `${calculateAverage('heartRate')} bpm`,
      trend: parseFloat(calculateTrend('heartRate')),
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600'
    },
    {
      title: 'Avg Sleep Hours',
      value: `${calculateAverage('sleepHours')} hrs`,
      trend: parseFloat(calculateTrend('sleepHours')),
      icon: Activity,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Avg Water Intake',
      value: `${calculateAverage('waterIntake')} L`,
      trend: parseFloat(calculateTrend('waterIntake')),
      icon: Droplets,
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Health Analytics</h2>
          <p className="text-slate-600">Visualize health trends and patterns</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
            <Calendar className="w-5 h-5 text-slate-500 inline-block mr-2" />
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
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className="border-0 bg-transparent focus:ring-0 text-slate-700 font-medium"
            >
              <option value="">All Users</option>
              {uniqueUserIds.map(userId => (
                <option key={userId} value={userId}>{userId}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-blue-500" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2">No Data for Analysis</h4>
          <p className="text-slate-500">Add health records to see analytics and trends.</p>
        </div>
      ) : (
        <>
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
                          <div className="flex items-center text-blue-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{stat.trend}%
                          </div>
                        ) : stat.trend < 0 ? (
                          <div className="flex items-center text-red-500 text-sm font-medium">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            {stat.trend}%
                          </div>
                        ) : (
                          <div className="text-slate-500 text-sm font-medium">No change</div>
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
                <h3 className="text-xl font-bold text-slate-900">Heart Rate Trends</h3>
                <p className="text-slate-600 text-sm mt-1">Track cardiovascular health</p>
              </div>
              <div className="p-6">
                <Line data={heartRateData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-slate-900">Blood Pressure Trends</h3>
                <p className="text-slate-600 text-sm mt-1">Monitor blood pressure patterns</p>
              </div>
              <div className="p-6">
                <Line data={bloodPressureData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-slate-900">Sleep Pattern Analysis</h3>
                <p className="text-slate-600 text-sm mt-1">Understand sleep quality over time</p>
              </div>
              <div className="p-6">
                <Bar data={sleepData} options={chartOptions} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;