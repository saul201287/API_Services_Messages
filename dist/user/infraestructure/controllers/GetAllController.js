"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllController = void 0;
class GetAllController {
    constructor(getAllUsers) {
        this.getAllUsers = getAllUsers;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ss");
                const users = yield this.getAllUsers.run();
                if (users) {
                    return res.status(201).send({
                        status: "recurso obtenido",
                        data: users,
                    });
                }
                else {
                    return res.status(409).send({
                        status: "error",
                        data: "error",
                    });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    status: "error",
                    data: "Ocurrió un error",
                    mesagges: error,
                });
            }
        });
    }
}
exports.GetAllController = GetAllController;
