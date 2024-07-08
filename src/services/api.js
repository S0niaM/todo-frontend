import axios from 'axios';



const API_URL = 'http://127.0.0.1:8000/api/tasks/'; // // for auth URL

export const getTasks = () => axios.get(API_URL);

export const addTask = (task) => axios.post(API_URL, task);

axios.defaults.baseURL = 'http://localhost:8000'; // for backend URL

export const editTask = async (id, data) => {
  try {
    const response = await axios.patch(`/api/tasks/${id}/`, data); 
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error; 
  }
};

export const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);

export const updateTask = async (id, updatedTaskData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, updatedTaskData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
};


