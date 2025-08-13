import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { HealthRecord } from '../types/health';

const HEALTH_COLLECTION = 'healthRecords';

export const healthService = {
  async saveHealthRecord(record: Omit<HealthRecord, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, HEALTH_COLLECTION), {
        ...record,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving health record:', error);
      throw error;
    }
  },

  async getUserHealthRecords(userId: string): Promise<HealthRecord[]> {
    try {
      const q = query(
        collection(db, HEALTH_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as HealthRecord));
    } catch (error) {
      console.error('Error fetching health records:', error);
      throw error;
    }
  },

  async deleteHealthRecord(recordId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, HEALTH_COLLECTION, recordId));
    } catch (error) {
      console.error('Error deleting health record:', error);
      throw error;
    }
  }
};