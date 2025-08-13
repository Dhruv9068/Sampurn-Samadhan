import React, { useState } from 'react';
import { Upload, Camera, Leaf, AlertTriangle, CheckCircle, X, Plus } from 'lucide-react';

const CropMonitor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        // Simulate analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          setAnalysisResult("Crop appears healthy with good growth patterns. Recommended: Continue current watering schedule. Monitor for early blight symptoms.");
          setIsAnalyzing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropRecords = [
    {
      id: 1,
      cropType: 'Tomatoes',
      location: 'Field A-1',
      health: 'Healthy',
      lastChecked: '2 hours ago',
      status: 'good',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      cropType: 'Corn',
      location: 'Field B-2',
      health: 'Disease Detected',
      lastChecked: '1 day ago',
      status: 'warning',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      cropType: 'Wheat',
      location: 'Field C-1',
      health: 'Excellent',
      lastChecked: '3 hours ago',
      status: 'excellent',
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      cropType: 'Lettuce',
      location: 'Greenhouse 1',
      health: 'Good',
      lastChecked: '5 hours ago',
      status: 'good',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Crops</h2>
          <p className="text-slate-600">Check for any issues with crops</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Crop Record</span>
        </button>
      </div>

      {/* Disease Detection Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">Crop Disease Detection</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img src={selectedImage} alt="Uploaded crop" className="max-h-48 mx-auto rounded-lg shadow-lg" />
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                        <span className="text-gray-600">Analyzing crop health...</span>
                      </div>
                    ) : analysisResult ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                          <div className="text-left">
                            <h4 className="font-semibold text-green-800 mb-2">Analysis Complete</h4>
                            <p className="text-green-700 text-sm">{analysisResult}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload crop images for AI-powered disease detection</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="crop-upload"
                    />
                    <label
                      htmlFor="crop-upload"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all cursor-pointer inline-flex items-center space-x-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Image</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crop Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cropRecords.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
          >
            <div className="relative">
              <img
                src={crop.image}
                alt={crop.cropType}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  crop.status === 'excellent' ? 'bg-blue-100 text-blue-700' :
                  crop.status === 'good' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {crop.health}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    crop.status === 'excellent' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                    crop.status === 'good' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                    'bg-gradient-to-br from-yellow-500 to-orange-600'
                  }`}>
                    {crop.status === 'warning' ? (
                      <AlertTriangle className="w-6 h-6 text-white" />
                    ) : (
                      <Leaf className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{crop.cropType}</h3>
                    <p className="text-sm text-slate-600">{crop.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Health Status:</span>
                  <span className={`font-medium ${
                    crop.status === 'excellent' ? 'text-blue-600' :
                    crop.status === 'good' ? 'text-green-600' :
                    'text-yellow-600'
                  }`}>
                    {crop.health}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Last Checked:</span>
                  <span className="text-slate-800">{crop.lastChecked}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {cropRecords.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-10 h-10 text-green-500" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2">No Crop Records Yet</h4>
          <p className="text-slate-500 mb-6">Start monitoring your crops by adding your first record.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Add First Record
          </button>
        </div>
      )}
    </div>
  );
};

export default CropMonitor;