import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "react-router";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";

export default function Quizzes() {
  const { cid } = useParams();
  const[quizzes, setQuizzes] = useState([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    console.log('quizzes', quizzes);
    setQuizzes(quizzes);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="d-flex align-items-center">
            <IoIosSearch className="me-2" />
            <input id="wd-search-quiz" className="form-control"
              placeholder="Search for Quiz" />
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="col-auto ms-auto">
            <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Quiz
            </button>
          </div>
        )}
      </div>
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quiz-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary align-items-center">
            Assignment Quizzes
          </div>
          <ul className="wd-quiz-list list-group rounded-0">
            {quizzes
              .map((quiz: any) => {
                const dueDate = new Date(quiz.dueDate);
                const availableDate = new Date(quiz.availableFrom);
                const formattedAvailableFromDate = availableDate.toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                });
                const formattedDueDate = dueDate.toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                });
                return (
                  <li className="wd-quiz list-group-item p-3 ps-1 d-flex align-items-center">
                    <MdOutlineRocketLaunch color="green" className="me-3 ms-2" />
                    <div className="me-5">
                      <a className="wd-quiz-link text-dark text-decoration-none"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                        {quiz.title}
                      </a>
                      <div className="text-muted small">
                        <strong>Not available until</strong> {formattedAvailableFromDate} |
                        <strong> Due</strong> {formattedDueDate} | {quiz.points} pts | {quiz.numQuestions} Questions
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <div className="ms-auto">
                        <GreenCheckmark />
                        <IoEllipsisVertical />
                      </div>
                    )}
                  </li>
                );
              })
            }
          </ul>
        </li>
      </ul>
    </div>
  );
}