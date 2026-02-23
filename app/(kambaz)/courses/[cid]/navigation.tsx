"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-course-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.includes(link.toLowerCase());
        return (
          <Link
            key={link}
            href={`/courses/${cid}/${link.toLowerCase()}`}
            className={`list-group-item border border-0 ${isActive ? "active text-black" : "text-danger"
              }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
