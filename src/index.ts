import { createServer } from "./server";

const server = createServer();

console.log(`Server running on http://localhost:${server.port}`);
