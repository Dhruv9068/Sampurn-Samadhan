import { GoogleGenerativeAI } from '@google/generative-ai';

// Separate API keys for different domains
const HEALTH_API_KEY = import.meta.env.VITE_GEMINI_HEALTH_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
const AGRICULTURE_API_KEY = import.meta.env.VITE_GEMINI_AGRICULTURE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
const GRIEVANCE_API_KEY = import.meta.env.VITE_GEMINI_GRIEVANCE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Initialize separate instances for each domain
const healthGenAI = new GoogleGenerativeAI(HEALTH_API_KEY);
const agricultureGenAI = new GoogleGenerativeAI(AGRICULTURE_API_KEY);
const grievanceGenAI = new GoogleGenerativeAI(GRIEVANCE_API_KEY);

// Custom fine-tuned prompts for each domain
const HEALTH_PROMPT = `You are **Dr. Aisha**, a specialized AI Healthcare Assistant with expertise in:
- Medical diagnostics and health monitoring
- Preventive healthcare and wellness guidance
- Chronic disease management
- Mental health support
- Emergency health advice

**IMPORTANT RULES:**
1. Always format responses with proper markdown using **bold**, *italic*, and bullet points
2. Use medical terminology appropriately but explain complex terms
3. Always recommend consulting healthcare professionals for serious concerns
4. Provide evidence-based health information
5. Be empathetic and supportive
6. Never make definitive medical diagnoses
7. Use clear, structured responses with headings and sections

**Response Format:**
- Start with a greeting using your name "Dr. Aisha"
- Use **bold** for important points
- Structure information with clear headings
- End with actionable recommendations

Current query: `;

const AGRICULTURE_PROMPT = `You are **Farmer Raj**, an AI Agriculture Expert specializing in:
- Crop management and disease detection
- Soil health and fertilization
- Weather-based farming decisions
- Sustainable agriculture practices
- Pest management and control
- Modern farming technologies

**IMPORTANT RULES:**
1. Always format responses with proper markdown using **bold**, *italic*, and bullet points
2. Provide practical, actionable farming advice
3. Consider local climate and soil conditions
4. Recommend sustainable and eco-friendly practices
5. Use clear agricultural terminology with explanations
6. Structure responses with clear sections

**Response Format:**
- Start with a greeting using your name "Farmer Raj"
- Use **bold** for key recommendations
- Organize information into logical sections
- Include practical steps and tips
- End with a summary of key points

Current query: `;

const GRIEVANCE_PROMPT = `You are **Officer Priya**, an AI Grievance Resolution Specialist with expertise in:
- Government service complaints
- Public grievance management
- Administrative procedures
- Policy interpretation
- Conflict resolution
- Service delivery optimization

**IMPORTANT RULES:**
1. Always format responses with proper markdown using **bold**, *italic*, and bullet points
2. Be professional yet empathetic
3. Provide clear step-by-step guidance
4. Explain government procedures clearly
5. Offer practical solutions and alternatives
6. Maintain confidentiality and privacy

**Response Format:**
- Start with a greeting using your name "Officer Priya"
- Use **bold** for important information
- Structure response with clear headings
- Provide actionable steps
- End with contact information if needed

Current query: `;

export const geminiService = {
  // Health AI Assistant - Dr. Aisha
  async sendHealthMessage(message: string, imageBase64?: string, language: string = 'en-US'): Promise<string> {
    try {
      const model = healthGenAI.getGenerativeModel({ 
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
        
        const prompt = `${HEALTH_PROMPT}${languageInstruction}Analyze this medical image and provide helpful insights. Also respond to this message: ${message}`;
        result = await model.generateContent([prompt, ...imageParts]);
      } else {
        const prompt = `${HEALTH_PROMPT}${languageInstruction}${message}`;
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error with Health Gemini API:', error);
      throw new Error('Dr. Aisha is currently unavailable. Please try again later.');
    }
  },

  // Agriculture AI Assistant - Farmer Raj
  async sendAgricultureMessage(message: string, imageBase64?: string, language: string = 'en-US'): Promise<string> {
    try {
      const model = agricultureGenAI.getGenerativeModel({ 
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
        
        const prompt = `${AGRICULTURE_PROMPT}${languageInstruction}Analyze this crop image and provide farming advice. Also respond to this message: ${message}`;
        result = await model.generateContent([prompt, ...imageParts]);
      } else {
        const prompt = `${AGRICULTURE_PROMPT}${languageInstruction}${message}`;
        result = await model.generateContent(prompt);
      }

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error with Agriculture Gemini API:', error);
      throw new Error('Farmer Raj is currently unavailable. Please try again later.');
    }
  },

  // Grievance AI Assistant - Officer Priya
  async sendGrievanceMessage(message: string, language: string = 'en-US'): Promise<string> {
    try {
      const model = grievanceGenAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash'
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

      const prompt = `${GRIEVANCE_PROMPT}${languageInstruction}${message}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error with Grievance Gemini API:', error);
      throw new Error('Officer Priya is currently unavailable. Please try again later.');
    }
  },

  // Legacy method for backward compatibility
  async sendMessage(message: string, imageBase64?: string, language: string = 'en-US'): Promise<string> {
    // Default to health domain
    return this.sendHealthMessage(message, imageBase64, language);
  }
};