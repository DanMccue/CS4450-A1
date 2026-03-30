"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import HTTP_SERVER from "@/lib/http-server";

type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};

type Module = {
  id: string;
  name: string;
  description: string;
  course: string;
};

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState<Assignment>({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState<Module>({
    id: "M101",
    name: "HTTP APIs",
    description: "Building RESTful APIs with route handlers",
    course: "CS4550",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  const encodedTitle = encodeURIComponent(assignment.title);
  const encodedScore = encodeURIComponent(assignment.score.toString());
  const encodedCompleted = encodeURIComponent(assignment.completed.toString());
  const encodedModuleName = encodeURIComponent(module.name);
  const encodedModuleDescription = encodeURIComponent(module.description);

  return (
    <div id="wd-working-with-objects">
      <h3>Working with Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <a id="wd-retrieve-module" className="btn btn-primary" href={MODULE_API_URL}>
        Get Module
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Assignment Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${encodedTitle}`}
      >
        Update Title
      </a>
      <FormControl
        id="wd-assignment-title"
        className="w-75 mb-2"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-secondary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${encodedScore}`}
      >
        Update Score
      </a>
      <FormControl
        id="wd-assignment-score"
        className="w-75 mb-2"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number.parseFloat(e.target.value) || 0 })
        }
      />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-success float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${encodedCompleted}`}
      >
        Update Completed
      </a>
      <div className="form-check form-switch mb-2">
        <input
          id="wd-assignment-completed"
          className="form-check-input"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Completed
        </label>
      </div>
      <hr />

      <h4>Modifying Module Properties</h4>
      <a
        id="wd-update-module-name"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${encodedModuleName}`}
      >
        Update Module Name
      </a>
      <FormControl
        id="wd-module-name"
        className="w-75 mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />

      <a
        id="wd-update-module-description"
        className="btn btn-secondary float-end"
        href={`${MODULE_API_URL}/description/${encodedModuleDescription}`}
      >
        Update Module Description
      </a>
      <FormControl
        id="wd-module-description"
        className="w-75 mb-2"
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <hr />
    </div>
  );
}
