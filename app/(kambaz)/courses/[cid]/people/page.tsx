"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../client";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  const courseId = (Array.isArray(cid) ? cid[0] : cid) ?? "";
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!courseId) return;
    try {
      const usersFromServer = await client.findUsersForCourse(courseId);
      setUsers(usersFromServer);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return (
    <div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
