"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import HTTP_SERVER from "@/lib/http-server";

type TodoForm = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState<TodoForm>({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        className="w-50"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Filtering Arrays</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating New Items</h4>
      <a id="wd-create-todo" className="btn btn-success" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        className="btn btn-danger float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        className="w-50 mb-2"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Updating an Item</h4>
      <a
        id="wd-update-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}
      >
        Update Todo
      </a>
      <FormControl
        className="w-25 float-start me-2 mb-2"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        className="w-50 float-start mb-2"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h4>On Your Own Updates</h4>
      <a
        id="wd-update-todo-completed"
        className="btn btn-secondary me-2"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>
      <a
        id="wd-update-todo-description"
        className="btn btn-secondary"
        href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}
      >
        Describe Todo ID = {todo.id}
      </a>
      <FormControl
        className="w-50 mt-2 mb-2"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <div className="form-check form-switch mb-2">
        <input
          id="wd-todo-completed"
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="wd-todo-completed">
          Completed
        </label>
      </div>
      <hr />
    </div>
  );
}
