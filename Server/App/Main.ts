import { App } from "./App";
import * as express from "express";
import * as path from "path";

normalizePath();
let app: express.Application = new App().App;
var debug = require("debug")("mysite:server");
var http = require("http");
var port = normalizePort(process.env.PORT || "4000");

app.set("port", port);

var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePath(): void {

	if (process.env.NODE_PATH) {
		return;
	}

	process.env.NODE_PATH = path.resolve(path.join(__dirname, "..", "..", ".deploy"));
	console.log("App path: " + process.env.NODE_PATH);
}

function normalizePort(val: any): any {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error: any) {
	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof port === "string"
		? "Pipe " + port
		: "Port " + port;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}


function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string"
		? "pipe " + addr
		: "port " + addr.port;
	debug("Listening on " + bind);
}
