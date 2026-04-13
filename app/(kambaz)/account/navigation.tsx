"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser
    ? [{ label: "Profile", path: "/account/profile", id: "wd-account-profile-link" }]
    : [
        { label: "Signin", path: "/account/signin", id: "wd-account-signin-link" },
        { label: "Signup", path: "/account/signup", id: "wd-account-signup-link" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          id={link.id}
          className={`list-group-item border-0 ${
            pathname.endsWith(link.path.split("/").pop() ?? "")
              ? "active"
              : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/account/users"
          className={`list-group-item border-0 ${
            pathname.endsWith("users") ? "active" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
