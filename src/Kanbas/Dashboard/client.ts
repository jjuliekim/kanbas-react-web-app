import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUser = async (userId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENTS_API, { userId, courseId });
  return response.data;
};

export const unenrollUser = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const getUserEnrollments = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${userId}`);
  return response.data;
};