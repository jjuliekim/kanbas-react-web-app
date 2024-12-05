import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll, setEnrollments } from "./reducer";
import * as client from "./client";
import * as coursesClient from "../Courses/client";

export default function Dashboard({
  course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);

  const handleEnrollment = async (courseId: string) => {
    if (isEnrolled(courseId)) {
      await client.unenrollUser(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } else {
      await client.enrollUser(currentUser._id, courseId);
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    }
  }

  const fetchEnrollments = async () => {
    const enrollments = await client.getUserEnrollments(currentUser._id);
    dispatch(setEnrollments(enrollments));
  }
  const fetchCourses = async () => {
    const fetchedCourses = await coursesClient.fetchAllCourses();
    setCourses(fetchedCourses);
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: { user: any; course: string; }) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };
  const displayedCourses = showAllCourses ? courses : courses.filter(course => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click"
              onClick={addNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5><br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} /> <hr />
        </div>
      )}

      <div className="d-flex justify-content-between">
        <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
        <button className="btn btn-primary" id="wd-dashboard-enrollments"
          onClick={() => setShowAllCourses(!showAllCourses)}>Enrollments</button>
      </div>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses
            .map((course) => (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={`images/${course._id}.png`} onError={(e) => { e.currentTarget.src = "images/blank-canvas.jpg"; }}
                      alt="course-img" width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description}
                      </p>
                      <button className="btn btn-primary"> Go </button>
                      {currentUser.role === "STUDENT" && (
                        <button
                          className={`btn float-end ${isEnrolled(course._id) ? "btn-danger" : "btn-success"}`}
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnrollment(course._id)
                          }}>
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {currentUser.role === "FACULTY" && (
                        <>
                          <button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end" id="wd-delete-course-click">
                            Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
