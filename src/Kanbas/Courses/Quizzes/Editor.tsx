import { useParams, useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";

export default function QuizzesEditor() {
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid === "new") {
        setQuiz({
          title: "Enter quiz title",
          description: "Enter quiz description",
          quizType: "graded-quiz",
          points: 100,
          assignmentGroup: "quizzes",
          shuffleAnswers: true,
          timeLimit: 20,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
          multipleAttempts: false,
          attemptsAllowed: 1,
          showAnswers: "never",
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestions: false,
        });
      } else {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        const foundQuiz = quizzes.find((quiz: any) => quiz._id === qid);
        setQuiz(foundQuiz);
      }
    };
    fetchQuiz();
  }, [cid, qid]);

  const handleSave = async () => {
    const quizData = { ...quiz };
    if (qid === "new") {
      await coursesClient.createQuizForCourse(cid as string, quizData);
    } else {
      await quizzesClient.updateQuiz({ ...quizData, _id: qid });
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleInputChange = (field: string, value: any) => {
    setQuiz(() => ({ ...quiz, [field]: value }));
  };

  return (
    <div id="wd-quizzes-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Quiz Name</label>
        <input id="wd-name" className="form-control"
          value={quiz?.title} onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea id="wd-description" className="form-control"
          value={quiz?.description} onChange={(e) => handleInputChange("description", e.target.value)} />
      </div>

      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-quiz-type" className="form-label">Quiz Type</label>
        </div>
        <div className="col">
          <select id="wd-quiz-type" className="form-select"
            value={quiz?.quizType} onChange={(e) => handleInputChange("quizType", e.target.value)}>
            <option value="graded-quiz">Graded Quiz</option>
            <option value="practice-quiz">Practice Quiz</option>
            <option value="graded-survey">Graded Survey</option>
            <option value="ungraded-survey">Ungraded Survey</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </div>
        <div className="col">
          <select id="wd-group" className="form-select"
            value={quiz?.assignmentGroup} onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
            <option value="assignments">ASSIGNMENTS</option>
            <option value="project">PROJECT</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col">
          <input id="wd-points" type="number" className="form-control"
            value={quiz?.points} onChange={(e) => handleInputChange("points", parseInt(e.target.value))} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-time-limit" className="form-label">Time Limit</label>
        </div>
        <div className="col d-flex align-items-center">
          <input id="wd-time-limit" type="number" className="form-control" style={{ width: 100 }}
            value={quiz?.timeLimit} onChange={(e) => handleInputChange("timeLimit", parseInt(e.target.value))} />
          <span className="ms-2">Minutes</span>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-allowed-attempts" className="form-label">Number of Attempts</label>
        </div>
        <div className="col">
          <input id="wd-allowed-attempts" type="number" className="form-control"
            value={quiz?.attemptsAllowed} onChange={(e) => handleInputChange("attemptsAllowed", parseInt(e.target.value))} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-show-answers" className="form-label">Show Correct Answers</label>
        </div>
        <div className="col">
          <select id="wd-show-answers" className="form-select"
            value={quiz?.showAnswers} onChange={(e) => handleInputChange("showAnswers", e.target.value)}>
            <option value="never">Never</option>
            <option value="immediately">Immediately</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-access-code" className="form-label">Access Code</label>
        </div>
        <div className="col">
          <input id="wd-access-code" className="form-control"
            value={quiz?.accessCode} onChange={(e) => handleInputChange("accessCode", e.target.value)} />
        </div>
      </div>

      <div className="row align-items-start mb-3">
        <div className="col text-end">
          Options
        </div>
        <div className="col border p-3">
          <div className="form-check mb-3">
            <input id="wd-shuffle-answers" type="checkbox" className="form-check-input"
              checked={quiz?.shuffleAnswers} onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)} />
            <label htmlFor="wd-shuffle-answers" className="form-check-label ms-2">Shuffle Answers</label>
          </div>
          <div className="form-check mb-3">
            <input id="wd-attempts" type="checkbox" className="form-check-input"
              checked={quiz?.multipleAttempts} onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)} />
            <label htmlFor="wd-attempts" className="form-check-label ms-2">Multiple Attempts</label>
          </div>
          <div className="form-check mb-3">
            <input id="wd-one-question" type="checkbox" className="form-check-input"
              checked={quiz?.oneQuestionAtATime} onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)} />
            <label htmlFor="wd-one-question" className="form-check-label ms-2">One Question at a Time</label>
          </div>
          <div className="form-check mb-3">
            <input id="wd-webcam" type="checkbox" className="form-check-input"
              checked={quiz?.webcamRequired} onChange={(e) => handleInputChange("webcamRequired", e.target.checked)} />
            <label htmlFor="wd-webcam" className="form-check-label ms-2">Webcam Required</label>
          </div>
          <div className="form-check">
            <input id="wd-lock-questions" type="checkbox" className="form-check-input"
              checked={quiz?.lockQuestions} onChange={(e) => handleInputChange("lockQuestions", e.target.checked)} />
            <label htmlFor="wd-lock-questions" className="form-check-label ms-2">Lock Questions After Answering</label>
          </div>
        </div>
      </div>

      <div className="row align-items-start mb-3">
        <div className="col text-end">
          Dates
        </div>
        <div className="col border p-3">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="wd-due-date" className="form-label">Due Date</label>
            </div>
            <div className="col">
              <input type="datetime-local" id="wd-due-date" className="form-control"
                value={quiz?.dueDate ? quiz.dueDate.slice(0, 16) : ""}
                onChange={(e) => handleInputChange("dueDate", e.target.value)} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="wd-available-from" className="form-label">Available from</label>
            </div>
            <div className="col">
              <input type="datetime-local" id="wd-available-from" className="form-control"
                value={quiz?.availableFrom ? quiz.availableFrom.slice(0, 16) : ""}
                onChange={(e) => handleInputChange("availableFrom", e.target.value)} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="wd-available-until" className="form-label">Available until</label>
            </div>
            <div className="col">
              <input type="datetime-local" id="wd-available-until" className="form-control"
                value={quiz?.availableUntil ? quiz.availableUntil.slice(0, 16) : ""}
                onChange={(e) => handleInputChange("availableUntil", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-5"></hr>
      <div className="float-end">
        <button id="wd-cancel-quiz" className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>Cancel</button>
        <button id="wd-save-quiz" className="btn btn-danger" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
