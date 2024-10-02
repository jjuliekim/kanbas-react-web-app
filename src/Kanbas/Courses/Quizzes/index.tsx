import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Quizzes() {
  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="input-group d-flex align-items-center">
            <IoIosSearch className="me-2" />
            <input id="wd-search-quiz" className="form-control"
              placeholder="Search for Quiz" />
          </div>
        </div>
        <div className="col-auto ms-auto">
          {/* <button id="wd-quiz-menu" className="btn btn-lg btn-secondary me-1 float-end">
            <IoEllipsisVertical className="fs-4" />
          </button> */}
          <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz
          </button>
        </div>
      </div>
      <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <a className="wd-quiz-link"
            href="#/Kanbas/Courses/1234/Quizzes/123">
            Q1 - HTML
          </a>
        </li>
        <li className="wd-quiz-list-item">
          <a className="wd-quiz-link"
            href="#/Kanbas/Courses/1234/Quizzes/124">
            Q2 - CSS
          </a>
        </li>
      </ul>
    </div>
  );
}