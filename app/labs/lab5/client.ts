import axios from "axios";
import HTTP_SERVER from "@/lib/http-server";

const LAB5_API = `${HTTP_SERVER}/lab5`;
const ASSIGNMENT_API = `${LAB5_API}/assignment`;
const TODOS_API = `${LAB5_API}/todos`;

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${LAB5_API}/welcome`);
  return response.data;
};

export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const encodedTitle = encodeURIComponent(title);
  const response = await axios.get(`${ASSIGNMENT_API}/title/${encodedTitle}`);
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

export const removeTodo = async (todo: { id: number }) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};

export const postNewTodo = async (todo: {
  title: string;
  completed: boolean;
  description?: string;
}) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

export const deleteTodo = async (todo: { id: number }) => {
  const response = await axios.delete(`${TODOS_API}/${todo.id}`);
  return response.data;
};

export const updateTodo = async (todo: {
  id: number;
  title?: string;
  completed?: boolean;
  description?: string;
}) => {
  const response = await axios.put(`${TODOS_API}/${todo.id}`, todo);
  return response.data;
};
