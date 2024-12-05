import { useParams, useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { Key, useEffect, useState } from "react";
import * as questionClient from "./questionClient";

export default function QuizzesEditor() {
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid === "new") {
        setQuiz({
          title: "Enter quiz title",
          description: "Enter quiz description",
          quizType: "Graded Quiz",
          points: 100,
          assignmentGroup: "QUIZZES",
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
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const quizData = { ...quiz, published: true };
    if (qid === "new") {
      await coursesClient.createQuizForCourse(cid as string, quizData);
    } else {
      await quizzesClient.updateQuiz({ ...quizData, _id: qid });
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  }

  const handleInputChange = (field: string, value: any) => {
    setQuiz((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  const detailsTab = () => {
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
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
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
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="PROJECT">PROJECT</option>
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
        <hr className="mt-5" />
        <div className="float-end">
          <button id="wd-cancel-quiz" className="btn btn-secondary me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>
            Cancel
          </button>
          <button id="wd-save-quiz" className="btn btn-danger me-2" onClick={handleSave}>
            Save
          </button>
          <button id="wd-save-publish-quiz" className="btn btn-danger" onClick={handleSaveAndPublish}>
            Save and Publish
          </button>
        </div>
      </div>
    );
  };

  const QuestionsTab = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [originalQuestions, setOriginalQuestions] = useState<any[]>([]);

    useEffect(() => {
      const fetchQuestions = async () => {
        if (!qid) return;
        const questions = await questionClient.findQuestionsForQuiz(qid);
        setQuestions(questions);
        setOriginalQuestions(questions);
      };
      fetchQuestions();
    }, [qid]);

    const handleAddQuestion = () => {
      const newQuestion = { questionType: "multipleChoice", choices: [""], correctAnswer: "" };
      setQuestions([...questions, newQuestion]);
      setOriginalQuestions([...originalQuestions, newQuestion]);
    };

    const handleSaveQuestion = async (index: number, question: any) => {
      if (question._id) {
        await questionClient.updateQuestion(qid as string, question._id, question);
      } else {
        const createdQuestion = await questionClient.createQuestion(qid as string, question);
        updateQuestion(index, { ...question, _id: createdQuestion._id });
      }
      setOriginalQuestions((prev) => prev.map((q, i) => i === index ? { ...questions[index] } : q));
    }

    const updateQuestion = (index: number, updatedQuestion: any) => {
      setQuestions((prevQuestions) => prevQuestions.map((q, i) => i === index ? { ...q, ...updatedQuestion } : q));
    }

    const handleRemoveQuestion = async (index: number) => {
      const question = questions[index];
      const updatedQuestions = questions.filter((_, i) => i !== index);
      const updatedOriginalQuestions = originalQuestions.filter((_, i) => i !== index); 
      setQuestions(updatedQuestions);
      setOriginalQuestions(updatedOriginalQuestions);
      if (question._id) {
        await questionClient.deleteQuestion(qid as string, question._id);
      }
    };

    const handleCancelEdit = (index: number) => {
      setQuestions((prevQuestions) => prevQuestions.map((q, i) => i === index ? { ...originalQuestions[index] } : q));
    }

    const totalPoints = questions.reduce((sum, question) => sum + (question.points || 0), 0);

    return (
      <div className="container mt-4">
        <div className="float-end">
          <strong>{totalPoints} Points</strong>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary mb-5" onClick={handleAddQuestion}>+ New Question</button>
        </div>

        <div>
          {questions.map((question, index) => (
            <div key={index} className="mb-5 border p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Question Type</strong>
                  <select className="dropdown form-select" value={question.questionType || "multipleChoice"}
                    onChange={(e) => updateQuestion(index, {
                      questionType: e.target.value, choices: [], correctAnswer: "", correctAnswers: [],
                    })}>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="trueFalse">True/False</option>
                    <option value="fillInTheBlank">Fill in the Blank</option>
                  </select>
                </div>
                <button className="btn btn-danger"
                  onClick={() => handleRemoveQuestion(index)}>
                  Remove Question
                </button>
              </div>

              <div>
                <strong>Question Text</strong>
                <input type="text" className="form-control" value={question.questionText || ""}
                  onChange={(e) => updateQuestion(index, { questionText: e.target.value })} />
              </div>

              <div>
                <strong>Points</strong>
                <input type="number" className="form-control" value={question.points || 0}
                  onChange={(e) => updateQuestion(index, { points: parseInt(e.target.value, 10) || 0 })} />
              </div>

              {question.questionType === "multipleChoice" && (
                <div>
                  <strong>Answers</strong>
                  {question.choices.map((choice: any, choiceIndex: Key | null | undefined) => (
                    <div key={choiceIndex} className="d-flex align-items-center mb-2">
                      <input type="radio" name={`correct-answer-${index}`} checked={question.correctAnswer === choice}
                        onChange={() => updateQuestion(index, { correctAnswer: choice })} />
                      <input type="text" className="form-control mx-2" value={choice || ""}
                        onChange={(e) => updateQuestion(index, {
                          choices: question.choices.map((c: any, ci: any) =>
                            ci === choiceIndex ? e.target.value : c
                          ),
                        })} />
                      <button className="btn btn-danger"
                        onClick={() => updateQuestion(index, {
                          choices: question.choices.filter((_: any, ci: any) => ci !== choiceIndex),
                        })}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button className="btn btn-secondary mt-2 ms-2"
                    onClick={() => updateQuestion(index, { choices: [...question.choices, ""] })}>
                    Add Choice
                  </button>
                </div>
              )}

              {question.questionType === "trueFalse" && (
                <div>
                  <strong>Correct Answer</strong>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" name={`true-false-${index}`} checked={question.correctAnswer === "true"}
                      onChange={() => updateQuestion(index, { correctAnswer: "true" })} />
                    <label className="form-check-label">True</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" name={`true-false-${index}`} checked={question.correctAnswer === "false"}
                      onChange={() => updateQuestion(index, { correctAnswer: "false" })} />
                    <label className="form-check-label">False</label>
                  </div>
                </div>
              )}

              {question.questionType === "fillInTheBlank" && (
                <div>
                  <strong>Correct Answers</strong>
                  {question.correctAnswers.map((answer: any, answerIndex: Key | null | undefined) => (
                    <div key={answerIndex} className="d-flex align-items-center mb-2">
                      <input type="text" className="form-control" value={answer || ""}
                        onChange={(e) => updateQuestion(index, {
                          correctAnswers: question.correctAnswers.map((a: any, ai: any) =>
                            ai === answerIndex ? e.target.value : a
                          ),
                        })} />
                      <button className="btn btn-danger ms-2"
                        onClick={() => updateQuestion(index, {
                          correctAnswers: question.correctAnswers.filter(
                            (_: any, ai: Key | null | undefined) => ai !== answerIndex
                          ),
                        })}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button className="btn btn-secondary mt-2 ms-2"
                    onClick={() => updateQuestion(index, { correctAnswers: [...question.correctAnswers, ""] })} >
                    Add Answer
                  </button>
                </div>
              )}
              <button className="btn btn-danger mt-3" onClick={() => handleSaveQuestion(index, question)}>
                Save Question
              </button>
              <button className="btn btn-secondary mt-3 ms-2" onClick={() => handleCancelEdit(index)}>
                Cancel Edits
              </button>
            </div>
          ))}
          <hr className="mt-5" />
          <div className="float-end">
            <button id="wd-cancel-quiz" className="btn btn-secondary me-2"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>
              Cancel
            </button>
            <button id="wd-save-quiz" className="btn btn-danger me-2" onClick={handleSave}>
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "details" ? "active text-black" : "text-danger"}`}
              onClick={() => setActiveTab("details")}>
              Details
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "questions" ? "active text-black" : "text-danger"}`}
              onClick={() => setActiveTab("questions")}>
              Questions
            </button>
          </li>
        </ul>
      </div>

      {activeTab === "details" && detailsTab()}
      {activeTab === "questions" && <QuestionsTab />}
    </div>
  );
}
