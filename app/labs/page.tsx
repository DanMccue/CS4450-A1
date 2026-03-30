import Link from "next/link";
import HTTP_SERVER from "@/lib/http-server";

const FRONTEND_REPO_URL = "https://github.com/DanMccue/CS4450-A1";
const BACKEND_REPO_URL = `https://github.com/DanMccue/kambaz-node-server-app`;

export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p>Daniel Mccue - CS4450 Jose Annunziato</p>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals </Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4: React State Management </Link>
        </li>
        <li>
          <Link href="/labs/lab5" id="wd-lab5-link">
            Lab 5: RESTful APIs and HTTP </Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz</Link>
        </li>
        <li>
          <a href={FRONTEND_REPO_URL} id="wd-github">
            Frontend Repository
          </a>
        </li>
        <li>
          <a href={BACKEND_REPO_URL} id="wd-backend-github">
            Backend Repository
          </a>
        </li>
        <li>
          <a href={HTTP_SERVER} id="wd-deployed-backend-url">
            Deployed Backend URL
          </a>
        </li>
      </ul>
    </div>
  );
}
