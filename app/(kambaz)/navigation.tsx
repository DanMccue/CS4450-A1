"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation" style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" >

      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem id="wd-account-link" as={Link} href="/account"
        className="bg-black text-center border-0 text-white">
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </ListGroupItem>

      <ListGroupItem id="wd-dashboard-link" as={Link} href="/dashboard"
        className="bg-white text-center border-0 text-danger">
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroupItem>

      <ListGroupItem id="wd-course-link" as={Link} href="/dashboard"
        className="bg-black text-center border-0 text-white">
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroupItem>

      <ListGroupItem id="wd-calendar-link" as={Link} href="/calendar"
        className="bg-black text-center border-0 text-white">
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroupItem>

      <ListGroupItem id="wd-inbox-link" as={Link} href="/inbox"
        className="bg-black text-center border-0 text-white">
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroupItem>

      <ListGroupItem id="wd-labs-link" as={Link} href="/labs"
        className="bg-black text-center border-0 text-white">
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroupItem>

    </ListGroup>
  );
}