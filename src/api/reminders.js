import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/reminders'; 

export const getReminders = () => {
  return axios.get(API_BASE_URL);
};

export const createReminder = (reminder) => {
  return axios.post(API_BASE_URL, reminder);
};

export const deleteReminder = (reminderId) => {
  return axios.delete(`${API_BASE_URL}/${reminderId}`);
};
