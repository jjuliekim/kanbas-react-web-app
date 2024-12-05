import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${quizId}`);
  return response.data;
}

export const createQuestion = async (quizId: string, questionData: any) => {
  console.log('createQuestion', questionData);
  const response = await axiosWithCredentials.post(`${QUESTIONS_API}/${quizId}`, questionData);
  return response.data;
};

export const updateQuestion = async (quizId: string, questionId: string, questionData: any) => {
  console.log('updateQuestion', questionData);
  const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${quizId}/${questionId}`, questionData);
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  console.log('deleteQuestion', questionId);
  const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${quizId}/${questionId}`);
  return response.data;
};