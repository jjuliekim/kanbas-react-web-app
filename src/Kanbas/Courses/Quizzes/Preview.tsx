import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as questionClient from "./questionClient";
import { useSelector } from "react-redux";
import * as attemptClient from "./attemptClient";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await questionClient.findQuestionsForQuiz(qid as string);
      setQuestions(questions);
      setUserAnswers(questions.map(() => ""));
    };
    fetchQuestions();
  }, [qid]);

  const handleAnswerChange = (index: number, value: any) => {
    setUserAnswers((prev) => prev.map((answer, i) => (i === index ? value : answer)));
  };

  const handleSubmit = async () => {
    const userAnswersArray = questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = question.questionType === "fillInTheBlank"
        ? question.correctAnswers.includes(userAnswer)
        : question.correctAnswer === userAnswer;
      return {
        question: question._id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
        points: isCorrect ? question.points : 0,
      };
    });
    const score = userAnswersArray.reduce((total, answer) => total + answer.points, 0);
    const attemptData = {
      user: currentUser._id,
      quiz: qid,
      score,
      attemptNumber: 1,
      userAnswers: userAnswersArray,
    };
    await attemptClient.createAttempt(qid as string, attemptData);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quiz</h2>
      <hr />
      {questions.map((question, index) => (
        <div key={question._id || index} className="my-4 border p-2">
          <h5>Question #{index + 1}:</h5>
          <p>{question.questionText}</p>

          {question.questionType === "multipleChoice" && (
            <div>
              {question.choices.map((choice: string, choiceIndex: number) => (
                <div key={choiceIndex} className="form-check">
                  <input type="radio" name={`q${index}`} value={choice}
                    className="form-check-input" checked={userAnswers[index] === choice}
                    onChange={(e) => handleAnswerChange(index, e.target.value)} />
                  <label className="form-check-label">
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          )}

          {question.questionType === "trueFalse" && (
            <div>
              <div className="form-check">
                <input type="radio" name={`q${index}`} value="true"
                  className="form-check-input" checked={userAnswers[index] === "true"}
                  onChange={(e) => handleAnswerChange(index, e.target.value)} />
                <label className="form-check-label">
                  True
                </label>
              </div>
              <div className="form-check">
                <input type="radio" name={`q${index}`} value="false"
                  className="form-check-input" checked={userAnswers[index] === "false"}
                  onChange={(e) => handleAnswerChange(index, e.target.value)} />
                <label className="form-check-label">
                  False
                </label>
              </div>
            </div>
          )}

          {question.questionType === "fillInTheBlank" && (
            <div>
              <input type="text" className="form-control" value={userAnswers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your answer"
              />
            </div>
          )}
        </div>
      ))}
      <hr />
      <div className="text-center mt-2">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
