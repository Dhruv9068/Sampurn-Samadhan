import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Heart, X } from 'lucide-react';
import { db, COLLECTIONS, serverTimestamp } from '../../../config/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';
import { FirebaseHealthRecord } from '../../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const HealthTracker: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState<FirebaseHealthRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    weight: '',
    height: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    bloodSugar: '',
    temperature: '',
    sleepHours: '',
    waterIntake: '',
    symptoms: '',
    mood: 'good' as const,
    notes: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const healthRecord: Omit<FirebaseHealthRecord, 'id'> = {
        userId: formData.userId || uuidv4(), // Generate a random UUID if no userId provided
        date: formData.date,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        bloodPressure: formData.bloodPressureSystolic && formData.bloodPressureDiastolic 
          ? {
              systolic: parseInt(formData.bloodPressureSystolic),
              diastolic: parseInt(formData.bloodPressureDiastolic)
            }
          : undefined,
        heartRate: formData.heartRate ? parseInt(formData.heartRate) : undefined,
        bloodSugar: formData.bloodSugar ? parseFloat(formData.bloodSugar) : undefined,
        temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
        sleepHours: formData.sleepHours ? parseFloat(formData.sleepHours) : undefined,
        waterIntake: formData.waterIntake ? parseFloat(formData.waterIntake) : undefined,
        symptoms: formData.symptoms ? formData.symptoms.split(',').map(s => s.trim()) : undefined,
        mood: formData.mood,
        notes: formData.notes || undefined,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db!, COLLECTIONS.HEALTH_RECORDS), healthRecord);
      setShowForm(false);
      
      // Reset form
      setFormData({
        userId: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        weight: '',
        height: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        heartRate: '',
        bloodSugar: '',
        temperature: '',
        sleepHours: '',
        waterIntake: '',
        symptoms: '',
        mood: 'good',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving health record:', error);
      alert('Failed to save health record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId: string) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      try {
        await deleteDoc(doc(db!, COLLECTIONS.HEALTH_RECORDS, recordId));
      } catch (error) {
        console.error('Error deleting health record:', error);
        alert('Failed to delete health record. Please try again.');
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Health Tracker</h2>
          <p className="text-slate-600">Log and monitor your daily health metrics</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Health Record</span>
        </button>
      </div>

      {/* Add Health Record Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">Add New Health Record</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">User ID (optional)</label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter a unique ID or leave blank"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="70.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="175"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Pressure (Systolic)</label>
                  <input
                    type="number"
                    value={formData.bloodPressureSystolic}
                    onChange={(e) => setFormData({...formData, bloodPressureSystolic: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="120"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Pressure (Diastolic)</label>
                  <input
                    type="number"
                    value={formData.bloodPressureDiastolic}
                    onChange={(e) => setFormData({...formData, bloodPressureDiastolic: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="80"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="72"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.bloodSugar}
                    onChange={(e) => setFormData({...formData, bloodSugar: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="95"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="98.6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Sleep Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.sleepHours}
                    onChange={(e) => setFormData({...formData, sleepHours: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="8"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Water Intake (L)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.waterIntake}
                    onChange={(e) => setFormData({...formData, waterIntake: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="2.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mood</label>
                  <select
                    value={formData.mood}
                    onChange={(e) => setFormData({...formData, mood: e.target.value as any})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Symptoms (comma separated)</label>
                  <input
                    type="text"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="headache, fatigue, nausea"
                  />
                </div>
                
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    rows={3}
                    placeholder="Additional notes about your health today..."
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Health Records List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-slate-900">Health Records</h3>
          <p className="text-slate-600 text-sm mt-1">Track health metrics over time</p>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : healthRecords.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-blue-500" />
              </div>
              <h4 className="text-lg font-semibold text-slate-700 mb-2">No Health Records Yet</h4>
              <p className="text-slate-500 mb-6">Start tracking health by adding a record.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all"
              >
                Add First Record
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {healthRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 hover:from-slate-100 hover:to-gray-100 transition-all border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{record.date}</h4>
                        <p className="text-sm text-slate-600">Mood: {record.mood}</p>
                        <p className="text-sm text-slate-600">User ID: {record.userId}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(record.id!)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {record.heartRate && (
                      <div className="text-center bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-2xl font-bold text-blue-600">{record.heartRate}</p>
                        <p className="text-sm text-slate-500">Heart Rate (bpm)</p>
                      </div>
                    )}
                    {record.bloodPressure && (
                      <div className="text-center bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-2xl font-bold text-blue-600">
                          {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}
                        </p>
                        <p className="text-sm text-slate-500">Blood Pressure</p>
                      </div>
                    )}
                    {record.temperature && (
                      <div className="text-center bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-2xl font-bold text-blue-600">{record.temperature}°F</p>
                        <p className="text-sm text-slate-500">Temperature</p>
                      </div>
                    )}
                    {record.sleepHours && (
                      <div className="text-center bg-white rounded-lg p-3 border border-gray-100">
                        <p className="text-2xl font-bold text-blue-600">{record.sleepHours}h</p>
                        <p className="text-sm text-slate-500">Sleep Hours</p>
                      </div>
                    )}
                  </div>
                  
                  {record.notes && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
                      <p className="text-sm text-slate-700">{record.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;