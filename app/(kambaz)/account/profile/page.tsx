"use client";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type UserProfile = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  role: string;
};

export default function Profile() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    currentUser ? (currentUser as UserProfile) : null
  );

  if (!currentUser) {
    redirect("/account/signin");
  }

  if (!profile) {
    return null;
  }

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    setProfile(updatedProfile);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form.Control
        id="wd-username"
        placeholder="username"
        value={profile.username}
        onChange={(e) =>
          setProfile({ ...profile, username: e.target.value })
        }
        className="mb-2"
      />
      <Form.Control
        id="wd-password"
        placeholder="password"
        type="password"
        value={profile.password}
        onChange={(e) =>
          setProfile({ ...profile, password: e.target.value })
        }
        className="mb-2"
      />
      <Form.Control
        id="wd-firstname"
        placeholder="First Name"
        value={profile.firstName}
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
        className="mb-2"
      />
      <Form.Control
        id="wd-lastname"
        placeholder="Last Name"
        value={profile.lastName}
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
        className="mb-2"
      />
      <Form.Control
        id="wd-dob"
        type="date"
        value={profile.dob?.split("T")[0] ?? ""}
        onChange={(e) =>
          setProfile({ ...profile, dob: e.target.value })
        }
        className="mb-2"
      />
      <Form.Control
        id="wd-email"
        type="email"
        value={profile.email}
        onChange={(e) =>
          setProfile({ ...profile, email: e.target.value })
        }
        className="mb-2"
      />
      <Form.Select
        id="wd-role"
        value={profile.role}
        onChange={(e) =>
          setProfile({ ...profile, role: e.target.value })
        }
        className="mb-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>
      <button
        className="btn btn-primary w-100 mb-2"
        id="wd-update-btn"
        onClick={updateProfile}
      >
        Update
      </button>
      <button
        className="btn btn-danger w-100 mb-2"
        id="wd-signout-btn"
        onClick={signout}
      >
        Sign out
      </button>
    </div>
  );
}