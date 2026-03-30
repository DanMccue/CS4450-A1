const server = process.env.NEXT_PUBLIC_HTTP_SERVER;

if (!server) {
  throw new Error("NEXT_PUBLIC_HTTP_SERVER must be configured.");
}

const HTTP_SERVER: string = server;

export default HTTP_SERVER;
