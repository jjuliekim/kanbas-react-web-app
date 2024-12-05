import { useParams, useNavigate } from "react-router-dom";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      const foundQuiz = quizzes.find((quiz: any) => quiz._id === qid);
      setQuiz(foundQuiz);
    };

    fetchQuizDetails();
  }, [cid, qid]);

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleStart = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/start`);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container">
      <h2>{quiz?.title}</h2>
      <div>{quiz?.description}</div>
      <hr />
      {currentUser.role === "STUDENT" ? (
        <div className="text-center">
          <button className="btn btn-danger" onClick={handleStart}>Start Quiz</button>
        </div>
      ) : (
        <>
          <div className="row mb-2">
            <div className="col text-end"><strong>Quiz Type:</strong></div>
            <div className="col">{quiz?.quizType}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Points:</strong></div>
            <div className="col">{quiz?.points}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Assignment Group:</strong></div>
            <div className="col">{quiz?.assignmentGroup}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Shuffle Answers:</strong></div>
            <div className="col">{quiz?.shuffleAnswers ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Time Limit:</strong></div>
            <div className="col">{quiz?.timeLimit} Minutes</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Multiple Attempts:</strong></div>
            <div className="col">{quiz?.multipleAttempts ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Number of Attempts:</strong></div>
            <div className="col">{quiz?.attemptsAllowed}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Show Correct Answers:</strong></div>
            <div className="col">{quiz?.showAnswers === "never" ? "Never" : "Immediately"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Access Code:</strong></div>
            <div className="col">{quiz?.accessCode}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>One Question at a Time:</strong></div>
            <div className="col">{quiz?.oneQuestionAtATime ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Webcam Required:</strong></div>
            <div className="col">{quiz?.webcamRequired ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Lock Questions After Answering:</strong></div>
            <div className="col">{quiz?.lockQuestions ? "Yes" : "No"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Due Date:</strong></div>
            <div className="col">{formatDate(quiz?.dueDate) || "Not set"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Available From:</strong></div>
            <div className="col">{formatDate(quiz?.availableFrom) || "Not set"}</div>
          </div>

          <div className="row mb-2">
            <div className="col text-end"><strong>Available Until:</strong></div>
            <div className="col">{formatDate(quiz?.availableUntil) || "Not set"}</div>
          </div>

          <hr />
          <div className="text-center">
            <button className="btn btn-secondary me-2" onClick={handleEdit}>Edit</button>
            <button className="btn btn-secondary" onClick={handlePreview}>Preview</button>
          </div>

        </>
      )}
    </div>
  );
}
