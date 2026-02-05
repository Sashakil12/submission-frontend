import apiClient from './api';

export const createInvitation = async (data) => {
  const response = await apiClient.post('/invitations', data);
  return response.data;
};

export const getMyInvitations = async () => {
  const response = await apiClient.get('/invitations/my');
  return response.data;
};

export const updateInvitationStatus = async (id, status) => {
  const response = await apiClient.patch(`/invitations/${id}`, { status });
  return response.data;
};

export const getMatchedJobs = async () => {
  const response = await apiClient.get('/ai/matched-jobs');
  return response.data;
};
