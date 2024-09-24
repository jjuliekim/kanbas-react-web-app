import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentsControl from "./AssignmentsControl";
import BSGripVertical from "../Modules/BsGripVertical";
import { BsGripVertical } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";

export default function Assignments() {
    return (
        <div>
            <div>
                <input id="wd-search-assignment" 
                    placeholder="Search for Assignments"/>
                <AssignmentsControl /> <br /><br /><br /><br />
            </div>
            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BSGripVertical />
                        ASSIGNMENTS 40% of Total
                        <AssignmentHeaderButtons />
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical />
                            <VscNotebook />
                            A1
                            <LessonControlButtons />
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical />
                            <VscNotebook />
                            A2 
                            <LessonControlButtons />
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical />
                            <VscNotebook />
                            A3
                            <LessonControlButtons />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}