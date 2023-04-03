const http = require("http");
const { URL } = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const searchParams = url.searchParams;

  if (searchParams.has("hello")) {
    const name = searchParams.get("hello");
    if (name === "") {
      response.statusCode = 400;
      response.statusMessage = "Error";
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
      response.end();
    }

    response.statusCode = 200;
    response.responseMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${name}`);
    response.end();
    return;
  }

  if (request.url === "/users") {
    response.statusCode = 200;
    response.responseMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers);
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.responseMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, word");

    response.end();
  }
  response.statusCode = 500;
  response.statusMessage = "Internal Server Error";
  response.setHeader("Content-Type", "text/plain");
  response.write("");
  response.end();
});

server.listen(port, () => {
  console.log(`сервер запущен по адресу http://${hostname}:${port}/`);
});
