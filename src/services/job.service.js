import apiClient from './api';

export const createJob = async (jobData) => {
  const response = await apiClient.post('/jobs', jobData);
  return response.data;
};

export const getJobs = async (params = {}) => {
  const response = await apiClient.get('/jobs', { params });
  return response.data;
};

export const getJobById = async (id) => {
  const response = await apiClient.get(`/jobs/${id}`);
  return response.data;
};

export const getMyPostedJobs = async () => {
  const response = await apiClient.get('/jobs/my/posted');
  return response.data;
};

export const getMatchedTalents = async (jobId) => {
  const response = await apiClient.get(`/jobs/ai/matched-talents/${jobId}`);
  return response.data;
};
