class SpeechService {
  private recognition: SpeechRecognition | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isListening = false;
  private isSpeaking = false;
  private currentLanguage = 'en-US';

  constructor() {
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.currentLanguage;
    }
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  async startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        resolve(transcript);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  async speak(text: string): Promise<void> {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      // Fallback to browser's built-in speech synthesis
      return this.speakWithBrowserAPI(text);
    }

    try {
      this.isSpeaking = true;
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/2zRM7PkgwBPiau2jvVXc`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      this.currentAudio = new Audio(audioUrl);
      
      return new Promise((resolve, reject) => {
        if (!this.currentAudio) {
          reject(new Error('Failed to create audio'));
          return;
        }

        this.currentAudio.onended = () => {
          this.isSpeaking = false;
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        this.currentAudio.onerror = () => {
          this.isSpeaking = false;
          URL.revokeObjectURL(audioUrl);
          reject(new Error('Audio playback failed'));
        };

        this.currentAudio.play();
      });
    } catch (error) {
      console.error('ElevenLabs error, falling back to browser speech:', error);
      this.isSpeaking = false;
      // Fallback to browser's built-in speech synthesis
      return this.speakWithBrowserAPI(text);
    }
  }

  private async speakWithBrowserAPI(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      this.isSpeaking = true;
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on current language
      utterance.lang = this.currentLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  stopSpeaking() {
    if (this.currentAudio && this.isSpeaking) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isSpeaking = false;
    }
    
    // Also stop browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  get isCurrentlyListening() {
    return this.isListening;
  }

  get isCurrentlySpeaking() {
    return this.isSpeaking;
  }
}

export const speechService = new SpeechService();