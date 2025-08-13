import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Activity, Droplets, Moon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { db, COLLECTIONS, FirebaseHealthRecord } from '../../../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const colorClasses = {
  rose: {
    bg: 'from-rose-400 to-pink-600',
    icon: 'bg-rose-100 text-rose-700',
    trend: 'text-rose-600',
  },
  blue: {
    bg: 'from-blue-400 to-indigo-600',
    icon: 'bg-blue-100 text-blue-700',
    trend: 'text-blue-600',
  },
  orange: {
    bg: 'from-orange-400 to-red-600',
    icon: 'bg-orange-100 text-orange-700',
    trend: 'text-orange-600',
  },
  purple: {
    bg: 'from-purple-400 to-violet-600',
    icon: 'bg-purple-100 text-purple-700',
    trend: 'text-purple-600',
  },
  indigo: {
    bg: 'from-indigo-400 to-purple-600',
    icon: 'bg-indigo-100 text-indigo-700',
    trend: 'text-indigo-600',
  },
  cyan: {
    bg: 'from-cyan-400 to-blue-600',
    icon: 'bg-cyan-100 text-cyan-600',
    trend: 'text-cyan-600',
  },
};

interface VitalCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  status: string;
  trend: string;
  color: keyof typeof colorClasses;
  delay?: number;
}

const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  icon: Icon,
  status,
  color,
  trend,
  delay = 0,
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      className="bg-cream-50 rounded-xl shadow-lg border border-blue-400 p-4 sm:p-6 relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
          <div className={`flex items-center text-sm ${colors.trend}`}>
            <span>{trend.includes('+') ? '↗' : '↘'} {trend}</span>
            <span className="ml-1 text-gray-500 hidden sm:inline">from last record</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-base font-medium px-4 py-2 rounded-full ${colors.icon}`}>
            {status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState<FirebaseHealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getLatestVital = (field: keyof FirebaseHealthRecord) => {
    const latestRecord = healthRecords[0];
    return latestRecord?.[field] || 'N/A';
  };

  const getLatestBloodPressure = () => {
    const latestRecord = healthRecords[0];
    if (latestRecord?.bloodPressure) {
      return `${latestRecord.bloodPressure.systolic}/${latestRecord.bloodPressure.diastolic}`;
    }
    return 'N/A';
  };

  const vitalCards = [
    {
      title: 'Heart Rate',
      value: `${getLatestVital('heartRate')} bpm`,
      icon: Heart,
      status: 'Normal',
      trend: '+2%',
      color: 'rose' as const,
    },
    {
      title: 'Blood Pressure',
      value: getLatestBloodPressure(),
      icon: Activity,
      status: 'Good',
      trend: '-1%',
      color: 'blue' as const,
    },
    {
      title: 'Temperature',
      value: `${getLatestVital('temperature')}°F`,
      icon: Thermometer,
      status: 'Normal',
      trend: '0%',
      color: 'orange' as const,
    },
    {
      title: 'Blood Sugar',
      value: `${getLatestVital('bloodSugar')} mg/dL`,
      icon: Droplets,
      status: 'Good',
      trend: '+5%',
      color: 'purple' as const,
    },
    {
      title: 'Sleep Hours',
      value: `${getLatestVital('sleepHours')} hrs`,
      icon: Moon,
      status: 'Good',
      trend: '+10%',
      color: 'indigo' as const,
    },
    {
      title: 'Water Intake',
      value: `${getLatestVital('waterIntake')} L`,
      icon: Droplets,
      status: 'Excellent',
      trend: '+15%',
      color: 'cyan' as const,
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-100/50 to-cyan-200/50 rounded-3xl p-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-black text-4xl font-bold mb-4">Health Dashboard</h2>
              <p className="text-xl text-blue-600">Your health summary</p>
            </div>
            <div className="text-right">
              <p className="text-5xl text-black font-bold">{healthRecords.length}</p>
              <p className="text-xl text-cyan-600 mt-2">Total Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {vitalCards.map((card, index) => (
          <VitalCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            status={card.status}
            trend={card.trend}
            color={card.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Recent Health Records */}
      <div className="bg-blue-50 rounded-3xl w-full">
        <div className="pr-8 pl-0 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">Recent Health Records</h3>
              <p className="text-xl text-slate-600 mt-2">Latest health tracking entries</p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg flex items-center space-x-2 text-md">
              <Plus className="w-4 h-4" />
              <span>Add Record</span>
            </button>
          </div>
        </div>
        <div className="pr-8 pl-0 pt-4">
          {healthRecords.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-blue-500" />
              </div>
              <h4 className="text-2xl font-semibold text-slate-700 mb-3">No Health Records Yet</h4>
              <p className="text-lg text-slate-500 mb-8">Start your health journey by adding a record</p>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all text-lg">
                Get Started
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {healthRecords.slice(0, 5).map((record, index) => (
                <motion.div
                  key={record.id}
                  className="bg-cream-50 rounded-xl shadow-md border border-blue-200 p-4 lg:p-6 hover:shadow-lg transition-shadow relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">{record.date}</p>
                        <div className="flex items-center space-x-6 text-base text-slate-600 mt-2">
                          {record.heartRate && (
                            <span className="flex items-center space-x-2">
                              <Heart className="w-5 h-5 text-rose-500" />
                              <span>{record.heartRate} bpm</span>
                            </span>
                          )}
                          {record.bloodPressure && (
                            <span className="flex items-center space-x-2">
                              <Activity className="w-5 h-5 text-blue-500" />
                              <span>{record.bloodPressure.systolic}/{record.bloodPressure.diastolic}</span>
                            </span>
                          )}
                          {record.temperature && (
                            <span className="flex items-center space-x-2">
                              <Thermometer className="w-5 h-5 text-orange-500" />
                              <span>{record.temperature}°F</span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">User ID: {record.userId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        record.mood === 'excellent' || record.mood === 'good' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        record.mood === 'fair' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {record.mood}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;