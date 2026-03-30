import { NextRequest, NextResponse } from "next/server";
import state, { Todo } from "../data";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ segments: string[] }>;
};

const parseNumber = (value: string) => Number.parseInt(value, 10);

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const routeNotFound = () =>
  NextResponse.json({ message: "Route not found" }, { status: 404 });

const parseMathParams = (aRaw: string, bRaw: string) => {
  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return null;
  }
  return { a, b };
};

const sendMathResult = (
  aRaw: string,
  bRaw: string,
  operation: (a: number, b: number) => number
) => {
  const parsed = parseMathParams(aRaw, bRaw);
  if (!parsed) {
    return NextResponse.json(
      { message: "Path parameters must be valid integers" },
      { status: 400 }
    );
  }
  return new NextResponse(operation(parsed.a, parsed.b).toString());
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { segments = [] } = await params;
  if (!segments.length) {
    return NextResponse.json({ message: "Welcome to Lab 5 API" });
  }

  const [resource, ...rest] = segments;

  switch (resource) {
    case "welcome":
      return new NextResponse("Welcome to Lab 5");

    case "add":
      if (rest.length === 2) {
        return sendMathResult(rest[0], rest[1], (a, b) => a + b);
      }
      return routeNotFound();

    case "subtract":
      if (rest.length === 2) {
        return sendMathResult(rest[0], rest[1], (a, b) => a - b);
      }
      return routeNotFound();

    case "multiply":
      if (rest.length === 2) {
        return sendMathResult(rest[0], rest[1], (a, b) => a * b);
      }
      return routeNotFound();

    case "divide":
      if (rest.length === 2) {
        return sendMathResult(rest[0], rest[1], (a, b) => a / b);
      }
      return routeNotFound();

    case "calculator": {
      const operation = request.nextUrl.searchParams.get("operation");
      const aRaw = request.nextUrl.searchParams.get("a");
      const bRaw = request.nextUrl.searchParams.get("b");
      if (!operation || !aRaw || !bRaw) {
        return NextResponse.json(
          { message: "operation, a, and b query parameters are required" },
          { status: 400 }
        );
      }

      const parsed = parseMathParams(aRaw, bRaw);
      if (!parsed) {
        return NextResponse.json(
          { message: "a and b must be valid integers" },
          { status: 400 }
        );
      }

      let result: number | string = "Invalid operation";
      switch (operation) {
        case "add":
          result = parsed.a + parsed.b;
          break;
        case "subtract":
          result = parsed.a - parsed.b;
          break;
        case "multiply":
          result = parsed.a * parsed.b;
          break;
        case "divide":
          result = parsed.a / parsed.b;
          break;
      }
      return new NextResponse(result.toString());
    }

    case "assignment":
      if (rest.length === 0) {
        return NextResponse.json(state.assignment);
      }
      if (rest[0] === "title" && rest.length === 1) {
        return NextResponse.json(state.assignment.title);
      }
      if (rest[0] === "title" && rest.length === 2) {
        state.assignment.title = safeDecode(rest[1]);
        return NextResponse.json(state.assignment);
      }
      if (rest[0] === "score" && rest.length === 2) {
        const score = Number.parseFloat(rest[1]);
        if (Number.isNaN(score)) {
          return NextResponse.json(
            { message: "Score must be a valid number" },
            { status: 400 }
          );
        }
        state.assignment.score = score;
        return NextResponse.json(state.assignment);
      }
      if (rest[0] === "completed" && rest.length === 2) {
        state.assignment.completed = rest[1] === "true";
        return NextResponse.json(state.assignment);
      }
      return routeNotFound();

    case "module":
      if (rest.length === 0) {
        return NextResponse.json(state.module);
      }
      if (rest[0] === "name" && rest.length === 1) {
        return NextResponse.json(state.module.name);
      }
      if (rest[0] === "name" && rest.length === 2) {
        state.module.name = safeDecode(rest[1]);
        return NextResponse.json(state.module);
      }
      if (rest[0] === "description" && rest.length === 2) {
        state.module.description = safeDecode(rest[1]);
        return NextResponse.json(state.module);
      }
      return routeNotFound();

    case "todos": {
      if (rest.length === 0) {
        const completed = request.nextUrl.searchParams.get("completed");
        if (completed !== null) {
          const completedValue = completed === "true";
          const filtered = state.todos.filter(
            (todo) => todo.completed === completedValue
          );
          return NextResponse.json(filtered);
        }
        return NextResponse.json(state.todos);
      }

      if (rest[0] === "create") {
        const newTodo: Todo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
          description: "Created with GET /todos/create",
        };
        state.todos.push(newTodo);
        return NextResponse.json(state.todos);
      }

      const todoId = parseNumber(rest[0]);
      if (Number.isNaN(todoId)) {
        return NextResponse.json(
          { message: "Todo ID must be a valid integer" },
          { status: 400 }
        );
      }

      const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
      const todo = todoIndex >= 0 ? state.todos[todoIndex] : null;

      if (rest.length === 1) {
        return NextResponse.json(todo);
      }

      if (rest.length === 2 && rest[1] === "delete") {
        if (todoIndex === -1) {
          return NextResponse.json(
            { message: `Unable to delete Todo with ID ${todoId}` },
            { status: 404 }
          );
        }
        state.todos.splice(todoIndex, 1);
        return NextResponse.json(state.todos);
      }

      if (rest.length === 3 && rest[1] === "title") {
        if (todoIndex === -1) {
          return NextResponse.json(
            { message: `Unable to update Todo with ID ${todoId}` },
            { status: 404 }
          );
        }
        state.todos[todoIndex].title = safeDecode(rest[2]);
        return NextResponse.json(state.todos);
      }

      if (rest.length === 3 && rest[1] === "completed") {
        if (todoIndex === -1) {
          return NextResponse.json(
            { message: `Unable to update Todo with ID ${todoId}` },
            { status: 404 }
          );
        }
        state.todos[todoIndex].completed = rest[2] === "true";
        return NextResponse.json(state.todos);
      }

      if (rest.length === 3 && rest[1] === "description") {
        if (todoIndex === -1) {
          return NextResponse.json(
            { message: `Unable to update Todo with ID ${todoId}` },
            { status: 404 }
          );
        }
        state.todos[todoIndex].description = safeDecode(rest[2]);
        return NextResponse.json(state.todos);
      }

      return routeNotFound();
    }

    default:
      return routeNotFound();
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { segments = [] } = await params;
  if (segments.length === 1 && segments[0] === "todos") {
    const incomingTodo = (await request.json()) as Partial<Todo>;
    const newTodo: Todo = {
      id: new Date().getTime(),
      title:
        typeof incomingTodo.title === "string" && incomingTodo.title.trim()
          ? incomingTodo.title
          : "New Posted Todo",
      completed:
        typeof incomingTodo.completed === "boolean"
          ? incomingTodo.completed
          : false,
      description:
        typeof incomingTodo.description === "string"
          ? incomingTodo.description
          : "",
    };
    state.todos.push(newTodo);
    return NextResponse.json(newTodo);
  }
  return routeNotFound();
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { segments = [] } = await params;
  if (segments.length === 2 && segments[0] === "todos") {
    const todoId = parseNumber(segments[1]);
    if (Number.isNaN(todoId)) {
      return NextResponse.json(
        { message: "Todo ID must be a valid integer" },
        { status: 400 }
      );
    }
    const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      return NextResponse.json(
        { message: `Unable to delete Todo with ID ${todoId}` },
        { status: 404 }
      );
    }
    state.todos.splice(todoIndex, 1);
    return new NextResponse(null, { status: 200 });
  }
  return routeNotFound();
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { segments = [] } = await params;
  if (segments.length === 2 && segments[0] === "todos") {
    const todoId = parseNumber(segments[1]);
    if (Number.isNaN(todoId)) {
      return NextResponse.json(
        { message: "Todo ID must be a valid integer" },
        { status: 400 }
      );
    }
    const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      return NextResponse.json(
        { message: `Unable to update Todo with ID ${todoId}` },
        { status: 404 }
      );
    }
    const updates = (await request.json()) as Partial<Todo>;
    state.todos[todoIndex] = {
      ...state.todos[todoIndex],
      ...updates,
      id: todoId,
    };
    return new NextResponse(null, { status: 200 });
  }
  return routeNotFound();
}
