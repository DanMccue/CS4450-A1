"use client";
import { Form } from "react-bootstrap";
import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <Form.Control id="wd-username"
        placeholder="username"
        className="mb-2" />
      <Form.Control id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2" />
      <Form.Control id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-2" />
      <Link href="/account/profile"
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn">
        Sign up
      </Link>
      <Link href="/account/signin" id="wd-signin-link">Sign in</Link>
    </div>
  );
}
