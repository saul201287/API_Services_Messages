"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const Dependecies_1 = require("./Dependecies");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/", (req, res) => {
    Dependecies_1.createUserController
        .run(req, res)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
exports.userRouter.post("/login", (req, res) => {
    Dependecies_1.authUserController
        .run(req, res)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
exports.userRouter.get("/", (req, res) => {
    Dependecies_1.getAllController
        .run(req, res)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
