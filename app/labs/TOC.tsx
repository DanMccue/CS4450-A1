"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HTTP_SERVER from "@/lib/http-server";

const FRONTEND_REPO_URL = "https://github.com/DanMccue/CS4450-A1";
const BACKEND_REPO_URL = "https://github.com/DanMccue/kambaz-node-server-app";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href="/labs"
          as={Link}
          id="wd-labs-link"
          className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}
        >
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab1"
          as={Link}
          id="wd-lab1-link"
          className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}
        >
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab2"
          as={Link}
          id="wd-lab2-link"
          className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}
        >
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab3"
          as={Link}
          id="wd-lab3-link"
          className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}
        >
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab4"
          as={Link}
          id="wd-lab4-link"
          className={`nav-link ${pathname.includes("lab4") ? "active" : ""}`}
        >
          Lab 4
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="/labs/lab5"
          as={Link}
          id="wd-lab5-link"
          className={`nav-link ${pathname.includes("lab5") ? "active" : ""}`}
        >
          Lab 5
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link} id="wd-kambaz-link">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={FRONTEND_REPO_URL} id="wd-github">
          Frontend Repo
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={BACKEND_REPO_URL} id="wd-server-repo-link">
          Backend Repo
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={HTTP_SERVER} id="wd-server-link">
          Server URL
        </NavLink>
      </NavItem>
    </Nav>
  );
}

