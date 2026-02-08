"use client";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="p-3">
            {/* Assignment Name */}
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="wd-name">
                        <Form.Label>Assignment Name</Form.Label>
                        <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
                    </Form.Group>
                </Col>
            </Row>

            {/* Description */}
            <Form.Group className="mb-3" controlId="wd-description">
                <Form.Control as="textarea" rows={10} defaultValue=
                "The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, Links to each of the lab assignments, Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page." />
            </Form.Group>

            {/* Points */}
            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <Form.Label htmlFor="wd-points">Points</Form.Label>
                </Col>
                <Col sm={8}>
                    <Form.Control id="wd-points" type="number" defaultValue={100} />
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

            {/* Display Grade */}
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

            {/* Submission Type */}
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
                        {/* Assign to */}
                        <Form.Group className="mb-3" controlId="wd-assign-to">
                            <Form.Label className="fw-bold">Assign to</Form.Label>
                            <Form.Control type="text" defaultValue="Everyone" />
                        </Form.Group>

                        {/* Due Date */}
                        <Form.Group className="mb-3" controlId="wd-due-date">
                            <Form.Label className="fw-bold">Due</Form.Label>
                            <Form.Control type="date" defaultValue="2024-05-13" />
                        </Form.Group>

                        {/* Available  grid */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="wd-available-from">
                                    <Form.Label className="fw-bold">Available from</Form.Label>
                                    <Form.Control type="date" defaultValue="2024-05-06" />
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

            {/* Buttons */}
            <div className="text-end">
                <Button variant="secondary" className="me-2" id="wd-assignments-editor-cancel">
                    Cancel
                </Button>
                <Button variant="danger" id="wd-assignments-editor-save">
                    Save
                </Button>
            </div>
        </div>
    );
}