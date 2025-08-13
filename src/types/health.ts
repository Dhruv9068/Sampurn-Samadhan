export interface HealthRecord {
  id?: string;
  userId: string;
  date: string;
  weight?: number;
  height?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  bloodSugar?: number;
  temperature?: number;
  sleepHours?: number;
  waterIntake?: number;
  symptoms?: string[];
  mood?: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  createdAt: Date;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}