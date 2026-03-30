export type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};

export type Module = {
  id: string;
  name: string;
  description: string;
  course: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

type Lab5State = {
  assignment: Assignment;
  module: Module;
  todos: Todo[];
};

const state: Lab5State = {
  assignment: {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  },
  module: {
    id: "M101",
    name: "HTTP APIs",
    description: "Building RESTful APIs with route handlers",
    course: "CS4550",
  },
  todos: [
    { id: 1, title: "Task 1", completed: false, description: "Prepare lab APIs" },
    { id: 2, title: "Task 2", completed: true, description: "Test route handlers" },
    { id: 3, title: "Task 3", completed: false, description: "Wire async client" },
    { id: 4, title: "Task 4", completed: true, description: "Verify rubric IDs" },
  ],
};

export default state;
