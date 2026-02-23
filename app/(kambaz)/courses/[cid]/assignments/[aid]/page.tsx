"use client";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find((a: any) => a._id === aid);

    if (!assignment) return <div>Assignment not found</div>;

    return (
        <div id="wd-assignments-editor" className="p-3">
            {/*  Name */}
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="wd-name">
                        <Form.Label>Assignment Name</Form.Label>
                        <Form.Control type="text" defaultValue={assignment.title} />
                    </Form.Group>
                </Col>
            </Row>

            {/* Points */}
            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <Form.Label htmlFor="wd-points">Points</Form.Label>
                </Col>
                <Col sm={8}>
                    {/* use 100 as fallback */}
                    <Form.Control id="wd-points" type="number" defaultValue={assignment.points || 100} />
                </Col>
            </Row>

            {/* Group */}
            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Select id="wd-group">
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
                    <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Select id="wd-display-grade-as">
                        <option value="Percentage">Percentage</option>
                        <option value="Letter">Letter</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Submission type */}
            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
                </Col>
                <Col sm={8}>
                    <div className="border rounded p-3">
                        <Form.Group className="mb-3">
                            <Form.Select id="wd-submission-type">
                                <option value="Online">Online</option>
                                <option value="OnPaper">On Paper</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" className="mb-2" />
                            <Form.Check type="checkbox" label="Website URL" id="wd-website-url" className="mb-2" defaultChecked />
                            <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" className="mb-2" />
                            <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" className="mb-2" />
                            <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" className="mb-2" />
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
                        {/* assign to */}
                        <Form.Group className="mb-3" controlId="wd-assign-to">
                            <Form.Label className="fw-bold">Assign to</Form.Label>
                            <Form.Control type="text" defaultValue="Everyone" />
                        </Form.Group>

                        {/* Duedate */}
                        <Form.Group className="mb-3" controlId="wd-due-date">
                            <Form.Label className="fw-bold">Due</Form.Label>
                            <Form.Control type="date" defaultValue={assignment.dueDate || "2024-05-13"} />
                        </Form.Group>

                        {/* Available  grid */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="wd-available-from">
                                    <Form.Label className="fw-bold">Available from</Form.Label>
                                    <Form.Control type="date" defaultValue={assignment.availableDate || "2024-05-06"} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="wd-available-until">
                                    <Form.Label className="fw-bold">Until</Form.Label>
                                    <Form.Control type="date" defaultValue="2024-05-20" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <hr />

            <div className="text-end">
                <Link href={`/courses/${cid}/assignments`}>
                    <Button variant="secondary" className="me-2" id="wd-assignments-editor-cancel">
                        Cancel
                    </Button>
                </Link>
                <Link href={`/courses/${cid}/assignments`}>
                    <Button variant="danger" id="wd-assignments-editor-save">
                        Save
                    </Button>
                </Link>
            </div>
        </div>
    );
}