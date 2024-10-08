// Julie Kim
import Lab1 from "./Lab1"
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>Julie Kim</h1>
            <h3>CS 4550 - Section 1</h3>
            <h1>Labs</h1>
            {/* <a href="https://github.com/jjuliekim/kanbas-react-web-app.git" id="wd-github" target="_blank" rel="noreferrer" >Github Repository</a> */}
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3" element={<Lab3 />} />
            </Routes>
        </div>
    );
}