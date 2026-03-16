"use client";
import { useTodoStore } from "./useTodoStore";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } =
    useTodoStore((state) => state);
  return (
    <div id="wd-todo-list-zustand">
      <h2>Todo List (Zustand)</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-zustand-add-todo-click">
            Add
          </Button>
          <Button onClick={updateTodo} id="wd-zustand-update-todo-click">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button
              onClick={() => deleteTodo(t.id)}
              id="wd-zustand-delete-todo-click"
            >
              Delete
            </Button>
            <Button
              onClick={() => setTodo(t)}
              id="wd-zustand-set-todo-click"
            >
              Edit
            </Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
