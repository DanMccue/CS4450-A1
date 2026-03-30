"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .profile()
      .then((currentUser) => {
        dispatch(setCurrentUser(currentUser));
      })
      .catch(() => {
        dispatch(setCurrentUser(null));
      })
      .finally(() => {
        setPending(false);
      });
  }, [dispatch]);

  if (pending) {
    return null;
  }

  return children;
}
