"use client";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    if (!user.username || !user.password) {
      setErrorMessage("Username and password are required.");
      return;
    }
    if (user.password !== user.verifyPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const currentUser = await client.signup({
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
      dispatch(setCurrentUser(currentUser));
      setErrorMessage("");
      router.push("/account/profile");
    } catch {
      setErrorMessage("Username already in use.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Form.Control
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={user.verifyPassword}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />
      <Form.Control
        id="wd-firstname"
        placeholder="first name"
        className="mb-2"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <Form.Control
        id="wd-lastname"
        placeholder="last name"
        className="mb-2"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <Form.Control
        id="wd-email"
        placeholder="email"
        type="email"
        className="mb-2"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
        onClick={signup}
      >
        Sign up
      </button>
      {errorMessage && (
        <div id="wd-signup-error-message" className="alert alert-danger">
          {errorMessage}
        </div>
      )}
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
