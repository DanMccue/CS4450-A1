"use client";

import { BsGripVertical } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment, setAssignments } from "./reducer";
import * as client from "./client";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  availableUntilDate?: string;
};

export default function Assignments() {
  const { cid } = useParams();
  const courseId = (Array.isArray(cid) ? cid[0] : cid) ?? "";
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  ) as { assignments: Assignment[] };
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };
  const dispatch = useDispatch();
  const canManageAssignments = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (!courseId) {
      dispatch(setAssignments([]));
      return;
    }
    client
      .findAssignmentsForCourse(courseId)
      .then((assignmentsFromServer) => {
        dispatch(setAssignments(assignmentsFromServer));
      })
      .catch(() => {
        dispatch(setAssignments([]));
      });
  }, [courseId, dispatch]);

  const onDeleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text className="bg-white border-end-0">
            <BiSearch />
          </InputGroup.Text>
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search..."
            className="border-start-0"
          />
        </InputGroup>

        {canManageAssignments && (
          <div>
            <Button
              variant="secondary"
              className="me-1"
              id="wd-add-assignment-group"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </Button>
            <Link href={`/courses/${courseId}/assignments/new`}>
              <Button variant="danger" id="wd-add-assignment">
                <FaPlus
                  className="position-relative me-2"
                  style={{ bottom: "1px" }}
                />
                Assignment
              </Button>
            </Link>
          </div>
        )}
      </div>

      <h3
        id="wd-assignments-title"
        className="d-flex justify-content-between align-items-center bg-light p-3 border border-bottom-0 rounded-top mb-0"
      >
        <div className="d-flex align-items-center">
          <BsGripVertical className="fs-3 me-2" />
          <BsChevronDown className="me-2" />
          <span className="fw-bolder me-2">ASSIGNMENTS</span>
        </div>
        <div>
          <span className="border border-dark rounded-5 p-1 px-2 me-2 fs-6 text-secondary">
            40% of Total
          </span>
          <FaPlus className="fs-4 text-secondary me-2" />
          <IoEllipsisVertical className="fs-4 text-secondary" />
        </div>
      </h3>

      <ListGroup className="rounded-0 rounded-bottom">
        {assignments.map((assignment) => (
            <ListGroup.Item
              key={assignment._id}
              className="p-3 ps-0 border-0 border-start border-success border-3 d-flex align-items-center"
            >
              <BsGripVertical className="fs-3 text-secondary me-2" />
              <BsFileEarmarkText className="fs-3 text-success me-3" />
              <div className="flex-grow-1">
                <Link
                  href={`/courses/${courseId}/assignments/${assignment._id}`}
                  className="wd-assignment-link text-decoration-none text-dark fw-bold fs-5"
                >
                  {assignment.title}
                </Link>
                <br />
                <span className="text-danger">Multiple Modules</span> |
                <span className="text-secondary">
                  {" "}
                  Not available until{" "}
                  {assignment.availableDate || "May 6 at 12:00am"} |{" "}
                </span>
                <br />
                <span className="text-secondary">
                  Due {assignment.dueDate || "May 13 at 11:59pm"} |{" "}
                  {assignment.points || 100} pts
                </span>
              </div>
              {canManageAssignments && (
                <FaTrash
                  className="text-danger me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (
                      confirm(
                        `Delete assignment "${assignment.title}"? This cannot be undone.`
                      )
                    ) {
                      onDeleteAssignment(assignment._id);
                    }
                  }}
                />
              )}
              <FaCheckCircle className="text-success fs-4 me-3" />
              <IoEllipsisVertical className="fs-4 text-secondary" />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}