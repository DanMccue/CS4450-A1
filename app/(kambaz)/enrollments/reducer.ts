import { createSlice } from "@reduxjs/toolkit";

type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: Enrollment = {
        _id: `${userId}-${courseId}`,
        user: userId,
        course: courseId,
      };
      const existing = state.enrollments.find(
        (enrollment) =>
          enrollment.user === newEnrollment.user &&
          enrollment.course === newEnrollment.course
      );
      if (!existing) {
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});
export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
