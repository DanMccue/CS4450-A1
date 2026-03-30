"use client";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      setErrorMessage("");
      router.push("/dashboard");
    } catch {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      {errorMessage && (
        <div id="wd-signin-error-message" className="alert alert-danger">
          {errorMessage}
        </div>
      )}
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}