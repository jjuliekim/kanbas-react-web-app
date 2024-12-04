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
          title: "",
          description: "",
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
    const quizData = { ...quiz, };
    if (qid === "new") {
      await coursesClient.createQuizForCourse(cid as string, quizData);
    } else {
      await quizzesClient.updateQuiz({ ...quizData, _id: qid });
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleInputChange = (field: string, value: any) => {
    setQuiz(() => ({ ...quiz, [field]: value }));
  }

  return (
    <div id="wd-quizzes-editor" className="container">
      <div>
        <label htmlFor="wd-name">Quiz Name</label>
        <input id="wd-name" className="form-control" placeholder="Name"
          value={quiz?.title} onChange={(e) => handleInputChange("title", e.target.value)} />
      </div>
      <textarea id="wd-description" className="form-control mt-3 mb-3"
        placeholder="Description" value={quiz?.description} onChange={(e) => handleInputChange("description", e.target.value)} />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-quiz-type">Quiz Type</label>
          </td>
          <td>
            <select id="wd-quiz-type" value={quiz?.quizType} onChange={(e) => handleInputChange("quizType", e.target.value)}>
              <option value="graded-quiz">Graded Quiz</option>
              <option value="practice-quiz">Practice Quiz</option>
              <option value="graded-survey">Graded Survey</option>
              <option value="ungraded-survey">Ungraded Survey</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" type="number"
              value={quiz?.points} onChange={(e) => handleInputChange("points", parseInt(e.target.value))} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" value={quiz?.assignmentGroup} onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}>
              <option value="quizzes">QUIZZES</option>
              <option value="exams">EXAMS</option>
              <option value="assignments">ASSIGNMENTS</option>
              <option value="project">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-shuffle-answers">Shuffle Answers</label>
          </td>
          <td>
            <input id="wd-shuffle-answers" type="checkbox"
              checked={quiz?.shuffleAnswers} onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-time-limit">Time Limit</label>
          </td>
          <td>
            <input id="wd-time-limit" type="number" value={quiz?.timeLimit} onChange={(e) => handleInputChange("timeLimit", parseInt(e.target.value))} />
            <label>  minutes</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-attempts">Multiple Attempts</label>
          </td>
          <td>
            <input id="wd-attempts" type="checkbox" checked={quiz?.multipleAttempts} onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-allowed-attempts">Number of Attempts</label>
          </td>
          <td>
            <input id="wd-allowed-attempts" type="number"
              value={quiz?.attemptsAllowed} onChange={(e) => handleInputChange("attemptsAllowed", parseInt(e.target.value))} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-show-answers">Show Correct Answers</label>
          </td>
          <td>
            <select id="wd-show-answers" value={quiz?.showAnswers} onChange={(e) => handleInputChange("showAnswers", e.target.value)}>
              <option value="never">Never</option>
              <option value="immediately">Immediately</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-access-code">Access Code</label>
          </td>
          <td>
            <input id="wd-access-code" value={quiz?.accessCode} onChange={(e) => handleInputChange("accessCode", e.target.value)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-one-question">One Question at a Time</label>
          </td>
          <td>
            <input id="wd-one-question" type="checkbox"
              checked={quiz?.oneQuestionAtATime} onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-webcam">Webcam Required</label>
          </td>
          <td>
            <input id="wd-webcam" type="checkbox"
              checked={quiz?.webcamRequired} onChange={(e) => handleInputChange("webcamRequired", e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-lock-questions">Lock Questions After Answering</label>
          </td>
          <td>
            <input id="wd-lock-questions" type="checkbox"
              checked={quiz?.lockQuestions} onChange={(e) => handleInputChange("lockQuestions", e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top"></td>
          <button id="wd-save-quiz" onClick={handleSave}>Save</button>
        </tr>
      </table>
    </div>
  );
}
