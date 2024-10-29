import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentsControl from "./AssignmentsControl";
import BSGripVertical from "../Modules/BsGripVertical";
import { BsGripVertical } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useSelector } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="d-flex align-items-center">
            <IoIosSearch className="me-2" />
            <input id="wd-search-assignment" className="form-control"
              placeholder="Search for Assignment" />
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="col-auto ms-auto">
            <AssignmentsControl />
          </div>
        )}
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary align-items-center">
            {currentUser.role === "FACULTY" && <BSGripVertical />}
            ASSIGNMENTS
            {currentUser.role === "FACULTY" && (<AssignmentHeaderButtons />)}
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => {
                const dueDate = new Date(assignment.dueDate);
                const availableDate = new Date(assignment.availableFrom);
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
                  <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                    {currentUser.role === "FACUTLY" && <BsGripVertical />}
                    <VscNotebook color="green" className="me-3" />
                    <div className="me-5">
                      <a className="wd-assignment-link text-dark text-decoration-none"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                        {assignment.title}
                      </a>
                      <div className="text-muted small">
                        <strong>Not available until</strong> {formattedAvailableFromDate} |
                        <strong> Due</strong> {formattedDueDate} | {assignment.points} pts
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <div className="ms-auto">
                        <LessonControlButtons />
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