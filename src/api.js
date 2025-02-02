import axios from "axios";

const API_BASE_URL = "https://excelimporter-backend.onrender.com/api";

// Function to upload the file to the backend
export const uploadFile = (formData) => {
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
};

export const getPreviewData = () => {
  return axios.get(`${API_BASE_URL}/preview`);
};

export const importValidRows = () => {
  return axios.post(`${API_BASE_URL}/import`);
};

export const deleteRow = (rowId) => {
  return axios.delete(`${API_BASE_URL}/delete-row/${rowId}`);
};

export const getErrors = () => {
  return axios.get(`${API_BASE_URL}/errors`);
};
