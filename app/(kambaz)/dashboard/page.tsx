"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

type Course = {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
};

type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type User = {
  _id: string;
  role?: string;
};

export default function Dashboard() {
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  ) as { courses: Course[] };
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: User | null };
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  ) as { enrollments: Enrollment[] };
  const dispatch = useDispatch();
  const canManageCourses = currentUser?.role === "FACULTY";
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Filter courses based on enrollment
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) =>
        enrollments.some(
          (e) =>
            e.user === currentUser?._id && e.course === c._id
        )
      );

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e) =>
        e.user === currentUser?._id && e.course === courseId
    );

  const createCourse = () => {
    if (!canManageCourses) {
      return;
    }
    const newCourse = { ...course, _id: uuidv4() };
    dispatch(addNewCourse(newCourse));
    if (currentUser?._id) {
      dispatch(enroll({ userId: currentUser._id, courseId: newCourse._id }));
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
      </h1>
      <hr />
      {canManageCourses && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={createCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
          />
          <FormControl
            as="textarea"
            value={course.description ?? ""}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
                {showAllCourses && (
                  <>
                    {isEnrolled(c._id) ? (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(
                            unenroll({
                              userId: currentUser?._id,
                              courseId: c._id,
                            })
                          );
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(
                            enroll({
                              userId: currentUser?._id,
                              courseId: c._id,
                            })
                          );
                        }}
                        className="btn btn-success float-end"
                      >
                        Enroll
                      </button>
                    )}
                  </>
                )}
                {canManageCourses && !showAllCourses && (
                  <>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(c._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}