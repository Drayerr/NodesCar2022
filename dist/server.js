"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (request, response) {
    return response.json({ msg: "coé" });
});
app.get("/yes", routes_1.createCourse);
app.listen(3000, function () { return console.log("Server is running!"); });
