import axios from 'axios';
import { Park } from './columns';

const API_URL = 'http://localhost:3333/api/data'; // Replace with your API URL

export const apiService = {
  getData: async (): Promise<Park[][]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },

  getDataById: async (id: number, position: number): Promise<Park | undefined> => {
    try {
      const response = await axios.get(`${API_URL}/${position}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data by ID ${id}:`, error);
    }
  },

  addData: async (position: number, infos: Park): Promise<void> => {
    try {
      await axios.post(`${API_URL}/${position}`, infos);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  },

  updateData: async (position: number, infos: Park): Promise<void> => {
    try {
      await axios.put(`${API_URL}/${position}/${infos.id}`, infos);
    } catch (error) {
      console.error(`Error updating data at position ${position}:`, error);
    }
  },

  removeData: async (position: number, id: number): Promise<void> => {
    try {
      return await axios.delete(`${API_URL}/${position}/${id}`);
    } catch (error) {
      console.error(`Error removing data at position ${position}, ID ${id}:`, error);
    }
  },
};
