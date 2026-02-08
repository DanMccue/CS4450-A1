"use client";

import { BsGripVertical } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs"; // Updated Icon
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      
      {/* Search bar and button controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup className="w-50">
          <InputGroup.Text className="bg-white border-end-0">
            <BiSearch />
          </InputGroup.Text>
          <Form.Control id="wd-search-assignment" 
                        placeholder="Search..." 
                        className="border-start-0" />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-1" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignment titles */}
      <h3 id="wd-assignments-title"
          className="d-flex justify-content-between align-items-center bg-light p-3 border border-bottom-0 rounded-top mb-0">
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

      {/* Assignments*/}
      <ListGroup className="rounded-0 rounded-bottom">
        
        <ListGroup.Item className="p-3 ps-0 border-0 border-start border-success border-3 d-flex align-items-center">
          <BsGripVertical className="fs-3 text-secondary me-2" />
          <BsFileEarmarkText className="fs-3 text-success me-3" />
          <div className="flex-grow-1">
            <Link href="/courses/1234/assignments/123"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold fs-5">
              A1 - ENV + HTML
            </Link>
            <br />
            <span className="text-danger">Multiple Modules</span> | 
            <span className="text-secondary"> Not available until May 6 at 12:00am | </span>
            <br />
            <span className="text-secondary">Due May 13 at 11:59pm | 100 pts</span>
          </div>
          <FaCheckCircle className="text-success fs-4 me-3" />
          <IoEllipsisVertical className="fs-4 text-secondary" />
        </ListGroup.Item>

        <ListGroup.Item className="p-3 ps-0 border-0 border-start border-success border-3 d-flex align-items-center">
          <BsGripVertical className="fs-3 text-secondary me-2" />
          <BsFileEarmarkText className="fs-3 text-success me-3" />
          <div className="flex-grow-1">
            <Link href="/courses/1234/assignments/124"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold fs-5">
              A2 - CSS + BOOTSTRAP
            </Link>
            <br />
            <span className="text-danger">Multiple Modules</span> | 
            <span className="text-secondary"> Not available until May 13 at 12:00am | </span>
            <br />
            <span className="text-secondary">Due May 20 at 11:59pm | 100 pts</span>
          </div>
          <FaCheckCircle className="text-success fs-4 me-3" />
          <IoEllipsisVertical className="fs-4 text-secondary" />
        </ListGroup.Item>

        <ListGroup.Item className="p-3 ps-0 border-0 border-start border-success border-3 d-flex align-items-center">
          <BsGripVertical className="fs-3 text-secondary me-2" />
          <BsFileEarmarkText className="fs-3 text-success me-3" />
          <div className="flex-grow-1">
            <Link href="/courses/1234/assignments/125"
                  className="wd-assignment-link text-decoration-none text-dark fw-bold fs-5">
              A3 - JAVASCRIPT + REACT
            </Link>
            <br />
            <span className="text-danger">Multiple Modules</span> | 
            <span className="text-secondary"> Not available until May 20 at 12:00am | </span>
            <br />
            <span className="text-secondary">Due May 27 at 11:59pm | 100 pts</span>
          </div>
          <FaCheckCircle className="text-success fs-4 me-3" />
          <IoEllipsisVertical className="fs-4 text-secondary" />
        </ListGroup.Item>

      </ListGroup>
    </div>
  );
}