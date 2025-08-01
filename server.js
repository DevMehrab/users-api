import http from "http";
import { URL } from "url";
import userRoutes from "./userRoutes.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  const baseUrl = `htpp://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);
  const path = parsedUrl.pathname;
  const param = parsedUrl.searchParams.get("id");
  userRoutes(req, res, path, param);
});

server.listen(PORT, () => {
  console.log("server running", PORT);
});
