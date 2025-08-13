import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User, Trash2 } from 'lucide-react';
import { geminiService } from '../../../services/geminiService';
import { speechService } from '../../../services/speechService';
import { AIMessage } from '../../../types/health';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Chat Assistant powered by Gemini AI. I can assist with various queries using voice or text input. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(
        `As a general AI assistant, provide helpful and accurate information about: ${inputMessage}.`,
        undefined,
        currentLanguage
      );

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
        content: 'I apologize, but I encountered an error processing your query. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
        content: 'Hello! I\'m your AI Chat Assistant powered by Gemini AI. I can assist with various queries using voice or text input. How can I help you today?',
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
    <div className="p-8 bg-gradient-to-br from-gold-50 to-cream-50 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cream-500 to-gold-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Chat Assistant</h2>
              <p className="text-cream-100">
                Powered by Gemini AI • Voice enabled • Multilingual support
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
              title="Clear Chat"
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
                    ? 'bg-gradient-to-r from-cream-500 to-gold-600 text-white'
                    : 'bg-gradient-to-br from-cream-600 to-gold-700'
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
                      ? 'bg-gradient-to-r from-gold-500 to-cream-600 text-white'
                      : 'bg-cream-50 text-gold-800 border border-cream-100'
                  }`}
                >
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
              <div className="w-12 h-12 bg-gradient-to-br from-gold-600 to-crema-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-cream-50 rounded-2xl p-4 border border-gold-100">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-cream-600 font-medium">AI is processing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
        <div className="p-4">
          <div className="flex items-end space-x-4">
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`p-3 rounded-xl transition-all shadow-sm ${
                isListening 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-gold-100 hover:bg-cream-200 text-gold-600'
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
                placeholder={isListening ? "Listening..." : `Ask me anything in ${languages.find(l => l.code === currentLanguage)?.name || 'your language'}...`}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none transition-all"
                rows={2}
                disabled={isListening}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-gold-500 to-cream-600 text-white p-3 rounded-xl hover:from-gold-600 hover:to-cream-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cream-500 rounded-full"></div>
              <span>Gemini AI</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
              <span>Voice Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};