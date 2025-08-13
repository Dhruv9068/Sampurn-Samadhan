import React, { useState, useRef } from 'react';
import { Send, Upload, Image, Bot, User, Trash2, Camera, Mic, MicOff, Volume2, VolumeX, Leaf } from 'lucide-react';
import { geminiService } from '../../../services/geminiService';
import { speechService } from '../../../services/speechService';
import { AIMessage } from '../../../types/health';

const AgricultureAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Agriculture Assistant powered by Gemini AI. I can help you with crop management, disease detection, farming techniques, and agricultural optimization. How can I assist you with your farm today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (dataUrl: string): string => {
    return dataUrl.split(',')[1];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage || 'Please analyze this crop image.',
      imageUrl: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const imageBase64 = selectedImage ? convertToBase64(selectedImage) : undefined;
      const agriculturalPrompt = inputMessage + (imageBase64 ? ' (analyzing crop image)' : '');
      
      // Add agricultural context to the prompt
      const contextualPrompt = `As an agricultural AI assistant, provide farming and crop management advice for: ${agriculturalPrompt}. Focus on practical farming solutions, crop health, disease prevention, and agricultural best practices.`;
      
      const response = await geminiService.sendMessage(contextualPrompt, imageBase64, currentLanguage);
      
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak the response
      try {
        setIsSpeaking(true);
        await speechService.speak(response);
        setIsSpeaking(false);
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your agricultural query. Please check your Gemini API key configuration and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleStartListening = async () => {
    try {
      setIsListening(true);
      const transcript = await speechService.startListening();
      setInputMessage(transcript);
      setIsListening(false);
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleStopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    speechService.setLanguage(language);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI Agriculture Assistant powered by Gemini AI. I can help you with crop management, disease detection, farming techniques, and agricultural optimization. How can I assist you with your farm today?',
        timestamp: new Date()
      }
    ]);
  };

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' },
    { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Agriculture Assistant</h2>
              <p className="text-green-100">
                Powered by Gemini AI • Voice enabled • Crop analysis • Disease detection • Farming guidance
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isSpeaking && (
              <button
                onClick={handleStopSpeaking}
                className="bg-red-500 bg-opacity-20 p-3 rounded-xl hover:bg-opacity-30 transition-all"
                title="Stop Speaking"
              >
                <VolumeX className="w-5 h-5" />
              </button>
            )}
            
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-xl border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 appearance-none cursor-pointer"
                title="Select Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-gray-900">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Ready</span>
            </div>
            <button
              onClick={clearChat}
              className="bg-white bg-opacity-20 p-3 rounded-xl hover:bg-opacity-30 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-br from-green-600 to-emerald-700'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Leaf className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div
                className={`flex-1 max-w-3xl ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-4 rounded-2xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-green-50 text-green-800 border border-green-100'
                  }`}
                >
                  {message.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={message.imageUrl}
                        alt="Uploaded"
                        className="rounded-xl max-w-xs max-h-48 object-cover shadow-lg"
                      />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-slate-500 mt-2 px-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">AI is analyzing your farm query...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
        {selectedImage && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-green-500" />
                <Leaf className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-green-700">Crop image selected for analysis</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedImage}
              alt="Selected"
              className="mt-3 rounded-xl max-h-24 object-cover shadow-lg"
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-end space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-100 hover:bg-green-200 p-3 rounded-xl transition-all shadow-sm"
              title="Upload Crop Image"
            >
              <Upload className="w-5 h-5 text-green-600" />
            </button>
            
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`p-3 rounded-xl transition-all shadow-sm ${
                isListening 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-green-100 hover:bg-green-200 text-green-600'
              }`}
              title={isListening ? "Stop Listening" : "Start Voice Input"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening..." : `Ask me about farming, crops, diseases in ${languages.find(l => l.code === currentLanguage)?.name || 'your language'}...`}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                rows={2}
                disabled={isListening}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Gemini AI</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Crop Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Disease Detection</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Voice Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureAIAssistant;