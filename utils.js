export function response(res, message) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: message }));
}
