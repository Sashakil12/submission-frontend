import apiClient from './api';

export const createApplication = async (data) => {
  const response = await apiClient.post('/applications', data);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await apiClient.get('/applications/my');
  return response.data;
};

export const getJobApplications = async (jobId) => {
  const response = await apiClient.get(`/applications/job/${jobId}`);
  return response.data;
};
