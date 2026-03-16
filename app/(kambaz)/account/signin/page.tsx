"use client";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../database";
import { useRouter } from "next/navigation";

type UserRecord = {
  username: string;
  password: string;
};

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = (db.users as UserRecord[]).find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (user) {
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
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
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}