"use client";
import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import Breadcrumb from "./Breadcrumb";
import { setCourses } from "../reducer";
import { setEnrollments } from "../../enrollments/reducer";
import * as client from "../client";

type Course = { _id: string; name: string };
type Enrollment = { _id: string; user: string; course: string };

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams();
  const courseId = (Array.isArray(cid) ? cid[0] : cid) ?? "";
  const router = useRouter();
  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  ) as { courses: Course[] };
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { _id: string } | null };
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  ) as { enrollments: Enrollment[] };
  const dispatch = useDispatch();
  const [showNavigation, setShowNavigation] = useState(true);
  const [pending, setPending] = useState(true);
  const course = courses.find((course) => course._id === courseId);
  const isEnrolled = Boolean(
    currentUser &&
      enrollments.some(
        (enrollment) =>
          enrollment.user === currentUser._id &&
          enrollment.course === courseId
      )
  );

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    Promise.all([client.fetchAllCourses(), client.findMyEnrollments()])
      .then(([coursesFromServer, enrollmentsFromServer]) => {
        dispatch(setCourses(coursesFromServer));
        dispatch(setEnrollments(enrollmentsFromServer));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setPending(false);
      });
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!pending && (!currentUser || !isEnrolled)) {
      router.replace("/dashboard");
    }
  }, [currentUser, isEnrolled, pending, router]);

  if (pending || !currentUser || !isEnrolled) {
    return null;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNavigation(!showNavigation)}
          style={{ cursor: "pointer" }}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showNavigation && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
