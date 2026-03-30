"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../client";

type Assignment = {
  _id?: string;
  title: string;
  course: string;
  points: number;
  dueDate: string;
  availableDate: string;
  availableUntilDate: string;
  description: string;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const courseId = (Array.isArray(cid) ? cid[0] : cid) ?? "";
  const assignmentId = (Array.isArray(aid) ? aid[0] : aid) ?? "";
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { role?: string } | null };
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  ) as { assignments: Assignment[] };
  const canManageAssignments = currentUser?.role === "FACULTY";
  const isReadOnly = !canManageAssignments;
  const isNew = assignmentId === "new";
  if (isReadOnly && isNew) {
    redirect(`/courses/${courseId}/assignments`);
  }
  const existingAssignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  const [notFound, setNotFound] = useState(false);

  const [assignment, setAssignment] = useState<Assignment>(() => {
    if (existingAssignment) {
      return {
        ...existingAssignment,
        course: courseId,
        points: existingAssignment.points ?? 100,
        dueDate: existingAssignment.dueDate ?? "2024-05-13",
        availableDate: existingAssignment.availableDate ?? "2024-05-06",
        availableUntilDate:
          existingAssignment.availableUntilDate ?? "2024-05-20",
        description: existingAssignment.description ?? "",
      };
    }
    return {
      title: "New Assignment",
      course: courseId,
      points: 100,
      dueDate: "2024-05-13",
      availableDate: "2024-05-06",
      availableUntilDate: "2024-05-20",
      description: "",
    };
  });

  useEffect(() => {
    if (isNew || existingAssignment) {
      return;
    }

    client
      .findAssignmentById(assignmentId)
      .then((remoteAssignment) => {
        if (!remoteAssignment) {
          setNotFound(true);
          return;
        }
        setAssignment({
          ...remoteAssignment,
          course: courseId,
          points: remoteAssignment.points ?? 100,
          dueDate: remoteAssignment.dueDate ?? "2024-05-13",
          availableDate: remoteAssignment.availableDate ?? "2024-05-06",
          availableUntilDate:
            remoteAssignment.availableUntilDate ?? "2024-05-20",
          description: remoteAssignment.description ?? "",
        });
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [assignmentId, courseId, existingAssignment, isNew]);

  const handleSave = async () => {
    if (isReadOnly) {
      router.push(`/courses/${courseId}/assignments`);
      return;
    }
    const assignmentToSave = { ...assignment, course: courseId };
    if (isNew) {
      const createdAssignment = await client.createAssignmentForCourse(
        courseId,
        assignmentToSave
      );
      dispatch(addAssignment(createdAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment(
        assignmentToSave as Assignment & { _id: string }
      );
      dispatch(updateAssignment(updatedAssignment));
    }
    router.push(`/courses/${courseId}/assignments`);
  };

  if (!isNew && !existingAssignment && notFound) {
    return <div id="wd-assignments-editor">Assignment not found</div>;
  }

  if (!isNew && !existingAssignment && !assignment._id && !notFound) {
    return <div id="wd-assignments-editor">Loading assignment...</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      {/* Name */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-name">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.title ?? ""}
              disabled={isReadOnly}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Description */}
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={assignment.description ?? ""}
              disabled={isReadOnly}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Points */}
      <Row className="mb-3">
        <Col sm={4} className="text-end">
          <Form.Label htmlFor="wd-points">Points</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Control
            id="wd-points"
            type="number"
            value={assignment.points}
            disabled={isReadOnly}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value) || 0,
              })
            }
          />
        </Col>
      </Row>

      {/* Group */}
      <Row className="mb-3">
        <Col sm={4} className="text-end">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select id="wd-group" disabled={isReadOnly}>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Grade */}
      <Row className="mb-3">
        <Col sm={4} className="text-end">
          <Form.Label htmlFor="wd-display-grade-as">
            Display Grade as
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Select id="wd-display-grade-as" disabled={isReadOnly}>
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Submission type */}
      <Row className="mb-3">
        <Col sm={4} className="text-end">
          <Form.Label htmlFor="wd-submission-type">
            Submission Type
          </Form.Label>
        </Col>
        <Col sm={8}>
          <div className="border rounded p-3">
            <Form.Group className="mb-3">
              <Form.Select id="wd-submission-type" disabled={isReadOnly}>
                <option value="Online">Online</option>
                <option value="OnPaper">On Paper</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Online Entry Options
              </Form.Label>
              <Form.Check
                type="checkbox"
                label="Text Entry"
                id="wd-text-entry"
                className="mb-2"
                disabled={isReadOnly}
              />
              <Form.Check
                type="checkbox"
                label="Website URL"
                id="wd-website-url"
                className="mb-2"
                defaultChecked
                disabled={isReadOnly}
              />
              <Form.Check
                type="checkbox"
                label="Media Recordings"
                id="wd-media-recordings"
                className="mb-2"
                disabled={isReadOnly}
              />
              <Form.Check
                type="checkbox"
                label="Student Annotation"
                id="wd-student-annotation"
                className="mb-2"
                disabled={isReadOnly}
              />
              <Form.Check
                type="checkbox"
                label="File Uploads"
                id="wd-file-upload"
                className="mb-2"
                disabled={isReadOnly}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>

      {/* Assign */}
      <Row className="mb-3">
        <Col sm={4} className="text-end">
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col sm={8}>
          <div className="border rounded p-3">
            <Form.Group className="mb-3" controlId="wd-assign-to">
              <Form.Label className="fw-bold">Assign to</Form.Label>
              <Form.Control
                type="text"
                defaultValue="Everyone"
                disabled={isReadOnly}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="wd-due-date">
              <Form.Label className="fw-bold">Due</Form.Label>
              <Form.Control
                type="date"
                value={assignment.dueDate}
                disabled={isReadOnly}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    dueDate: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="wd-available-from"
                >
                  <Form.Label className="fw-bold">
                    Available from
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableDate}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="wd-available-until"
                >
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableUntilDate}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntilDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />

      <div className="text-end">
        <Button
          variant="secondary"
          className="me-2"
          id="wd-assignments-editor-cancel"
          onClick={() =>
            router.push(`/courses/${courseId}/assignments`)
          }
        >
          {isReadOnly ? "Back" : "Cancel"}
        </Button>
        {!isReadOnly && (
          <Button
            variant="danger"
            id="wd-assignments-editor-save"
            onClick={handleSave}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}