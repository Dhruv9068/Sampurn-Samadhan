import React, { useState, useRef } from 'react';
import { Send, Upload, Image, Bot, User, Trash2, Camera, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { geminiService } from '../../../services/geminiService';
import { speechService } from '../../../services/speechService';
import { AIMessage } from '../../../types/health';

// Enhanced markdown renderer for AI responses
const renderMarkdown = (text: string) => {
  return text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2 border-l-4 border-blue-500 pl-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3 border-b-2 border-blue-300 pb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-6 mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">$1</h1>')
    // Bullet points
    .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="text-blue-500 mr-2">•</span><span>$1</span></li>')
    // Numbered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 flex items-start"><span class="text-blue-500 mr-2 font-semibold">$&</span></li>')
    // Code blocks
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-3 leading-relaxed">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph tags
    .replace(/^(.+)$/gm, '<p class="mb-3 leading-relaxed">$1</p>')
    // Clean up empty paragraphs
    .replace(/<p class="mb-3 leading-relaxed"><\/p>/g, '')
    .replace(/<p class="mb-3 leading-relaxed"><br><\/p>/g, '');
};

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m **Dr. Aisha**, your AI Health Assistant powered by Gemini AI. I can help you with health questions, analyze medical images, and provide wellness guidance. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false); // Disabled by default
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
      content: inputMessage || 'Please analyze this image.',
      imageUrl: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const imageBase64 = selectedImage ? convertToBase64(selectedImage) : undefined;
      const response = await geminiService.sendHealthMessage(inputMessage, imageBase64, currentLanguage);
      
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak the response only if enabled
      if (autoSpeak) {
        try {
          setIsSpeaking(true);
          await speechService.speak(response);
          setIsSpeaking(false);
        } catch (error) {
          console.error('Speech synthesis error:', error);
          setIsSpeaking(false);
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please check your Gemini API key configuration and try again.',
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
        content: 'Hello! I\'m **Dr. Aisha**, your AI Health Assistant powered by Gemini AI. I can help you with health questions, analyze medical images, and provide wellness guidance. How can I assist you today?',
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
    <div className="p-8 bg-gradient-to-br from-slate-50 to-gray-100 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Health Assistant</h2>
              <p className="text-emerald-100">
                Powered by Gemini AI • Voice enabled • Real-time health guidance • Image analysis support
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
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
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
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                    : 'bg-gradient-to-br from-slate-600 to-slate-700'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
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
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white'
                      : 'bg-slate-50 text-slate-800 border border-gray-100'
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
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 px-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">AI is analyzing...</span>
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
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-emerald-500" />
                <Camera className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">Image selected for analysis</span>
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
              className="bg-slate-100 hover:bg-slate-200 p-3 rounded-xl transition-all shadow-sm"
              title="Upload Image"
            >
              <Upload className="w-5 h-5 text-slate-600" />
            </button>
            
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`p-3 rounded-xl transition-all shadow-sm ${
                isListening 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
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
                placeholder={isListening ? "Listening..." : `Ask me about your health in ${languages.find(l => l.code === currentLanguage)?.name || 'your language'}...`}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                rows={2}
                disabled={isListening}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Dr. Aisha - Health AI</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Image Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span>Voice Control</span>
            </div>
          </div>

          {/* Auto-speak Toggle */}
          <div className="flex items-center justify-center mt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-slate-600">Auto-speak responses</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;