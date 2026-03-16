"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function ReactContextTodoList() {
  const { todos, todo, addTodo, deleteTodo, updateTodo, setTodo } =
    useTodos()!;
  return (
    <div id="wd-todo-list-context">
      <h2>Todo List (React Context)</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-context-add-todo-click">
            Add
          </Button>
          <Button onClick={updateTodo} id="wd-context-update-todo-click">
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
              id="wd-context-delete-todo-click"
            >
              Delete
            </Button>
            <Button
              onClick={() => setTodo(t)}
              id="wd-context-set-todo-click"
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
