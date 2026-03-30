"use client";
import { useEffect, useState } from "react";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  editing?: boolean;
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const removeTodo = async (todo: Todo) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
    setErrorMessage(null);
  };

  const createNewTodo = async () => {
    const updatedTodos = await client.createNewTodo();
    setTodos(updatedTodos);
    setErrorMessage(null);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
      description: "Created with HTTP POST",
    });
    setTodos((existingTodos) => [...existingTodos, newTodo]);
    setErrorMessage(null);
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos((existingTodos) =>
        existingTodos.filter((existingTodo) => existingTodo.id !== todo.id)
      );
      setErrorMessage(null);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(
        axiosError.response?.data?.message ?? "Unable to delete the selected todo."
      );
    }
  };

  const editTodo = (todo: Todo) => {
    setTodos((existingTodos) =>
      existingTodos.map((existingTodo) =>
        existingTodo.id === todo.id
          ? { ...existingTodo, editing: true }
          : existingTodo
      )
    );
  };

  const setTodoLocally = (todo: Todo, updates: Partial<Todo>) => {
    setTodos((existingTodos) =>
      existingTodos.map((existingTodo) =>
        existingTodo.id === todo.id
          ? { ...existingTodo, ...updates }
          : existingTodo
      )
    );
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const { editing, ...todoToPersist } = todo;
      await client.updateTodo(todoToPersist);
      setTodos((existingTodos) =>
        existingTodos.map((existingTodo) =>
          existingTodo.id === todo.id ? { ...todo, editing } : existingTodo
        )
      );
      setErrorMessage(null);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(
        axiosError.response?.data?.message ?? "Unable to update the selected todo."
      );
    }
  };

  useEffect(() => {
    client.fetchTodos().then((remoteTodos) => {
      setTodos(remoteTodos);
    });
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              id="wd-edit-todo"
            />
            <input
              type="checkbox"
              checked={todo.completed}
              className="form-check-input me-2 float-start"
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                value={todo.title}
                onChange={(e) =>
                  setTodoLocally(todo, {
                    title: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({
                      ...todo,
                      title: e.currentTarget.value,
                      editing: false,
                    });
                  }
                }}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
