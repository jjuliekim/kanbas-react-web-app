import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as attemptClient from "./attemptClient";
import * as questionClient from "./questionClient";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [attemptData, setAttemptData] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await questionClient.findQuestionsForQuiz(qid as string);
        setQuestions(questions);
        const attempt = await attemptClient.findAttemptForUserQuiz(qid as string, currentUser._id);
        setAttemptData(attempt);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [qid, currentUser]);

  if (!attemptData || !attemptData.userAnswers) {
    console.log('attempt data:', attemptData);
    console.log('user answers: ', attemptData?.userAnswers);
    return <div className="text-center mt-4">Invalid Attempt</div>;
  }

  let currentTotalScore = 0;
  const totalPossibleScore = questions.reduce((sum, question) => sum + question.points, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Results</h2>
      <hr />
      {questions.map((question, index) => {
        const userAnswerObj = attemptData.userAnswers.find((answer: any) => answer.question === question._id);
        let isCorrect = false;
        const userAnswer = userAnswerObj?.userAnswer || "No Answer";
        if (question.questionType === "fillInTheBlank") {
          isCorrect = question.correctAnswers.some((correctAnswer: string) =>
            userAnswer.toLowerCase() === correctAnswer.toLowerCase());
        } else {
          isCorrect = userAnswerObj?.correct || false;
        }
        if (isCorrect) {
          currentTotalScore += question.points;
        }

        return (
          <div key={question._id || index} className="my-4 border p-2">
            <div className={`d-flex align-items-center ${isCorrect ? "text-success" : "text-danger"}`}>
              {isCorrect ? <FaCheck className="me-2" /> : <FaTimes className="me-2" />}
              <h5 className="mb-0">Question #{index + 1}:</h5>
              <span className="ms-auto">{question.points} Points</span>
            </div>

            <p className="mt-2">{question.questionText}</p>
            <div>
              <strong>Your Answer: </strong>
              {userAnswer}
            </div>
            <div>
              <strong>Correct Answer: </strong>
              {question.questionType === "fillInTheBlank"
                ? question.correctAnswers.join(", ")
                : question.correctAnswer
              }
            </div>
          </div>
        );
      })}
      <hr />
      <div className="text-end my-4">
        <strong>Total Score: {currentTotalScore}/{totalPossibleScore}</strong>
      </div>
    </div>
  );
}
