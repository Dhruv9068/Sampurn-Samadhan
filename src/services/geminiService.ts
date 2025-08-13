import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const geminiService = {
  async sendMessage(message: string, imageBase64?: string, language: string = 'en-US'): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ 
        model: imageBase64 ? 'gemini-1.5-flash' : 'gemini-1.5-flash'
      });

      const languageInstruction = language !== 'en-US' ? 
        `Please respond in ${language.includes('hi') ? 'Hindi' : 
                            language.includes('es') ? 'Spanish' : 
                            language.includes('fr') ? 'French' : 
                            language.includes('de') ? 'German' : 
                            language.includes('ja') ? 'Japanese' : 
                            language.includes('ko') ? 'Korean' : 
                            language.includes('zh') ? 'Chinese' : 
                            language.includes('ar') ? 'Arabic' : 
                            language.includes('pt') ? 'Portuguese' : 'English'}. ` : '';

      let result;
      
      if (imageBase64) {
        const imageParts = [
          {
            inlineData: {
              data: imageBase64,
              mimeType: 'image/jpeg'
            }
          }
        ];
        
        const prompt = `${languageInstruction}As a healthcare AI assistant, analyze this medical image and provide helpful insights. Also respond to this message: ${message}`;
        result = await model.generateContent([prompt, ...imageParts]);
      } else {
        const prompt = `${languageInstruction}As a healthcare AI assistant, provide helpful and accurate information about: ${message}. 
        Remember to always recommend consulting with healthcare professionals for serious concerns.`;
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error with Gemini API:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }
};