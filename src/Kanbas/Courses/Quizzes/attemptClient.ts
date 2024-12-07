import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ATTEMPT_API = `${REMOTE_SERVER}/api/attempt`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${ATTEMPT_API}/${quizId}`);
  return response.data;
}

export const createAttempt = async (quizId: string, attemptData: any) => {
  const response = await axiosWithCredentials.post(`${ATTEMPT_API}/${quizId}`, attemptData);
  return response.data;
};

export const updateAttempt = async (attemptId: string, attemptData: any) => {
  const response = await axiosWithCredentials.put(`${ATTEMPT_API}/${attemptId}`, attemptData);
  return response.data;
};

export const deleteAttempt = async (attemptId: string) => {
  const response = await axiosWithCredentials.delete(`${ATTEMPT_API}/${attemptId}`);
  return response.data;
};

export const findAttemptForUserQuiz = async (quizId: string, userId: string) => {
  const response = await axiosWithCredentials.get(`${ATTEMPT_API}/${quizId}/${userId}`);
  return response.data;
};