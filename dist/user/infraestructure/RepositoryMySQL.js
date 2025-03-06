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
exports.RepositoryMysql = void 0;
const EUser_1 = require("../../db/entities/EUser");
const User_1 = require("../domain/User");
class RepositoryMysql {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(EUser_1.EUser);
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = this.userRepository.create({
                    id: 0,
                    nombre: user.nombre,
                    apellidos: user.apellidos,
                    email: user.email,
                    password: user.password,
                    tipo_user: user.tipo_user,
                    id_divece: user.id_divece,
                });
                const savedUser = yield this.userRepository.save(newUser);
                if (!savedUser || !savedUser.id) {
                    return null;
                }
                else {
                    return new User_1.User(savedUser.id, savedUser.nombre, savedUser.apellidos, savedUser.email, savedUser.password, savedUser.tipo_user, savedUser.id_divece);
                }
            }
            catch (error) {
                console.error("Error: " + error);
                return null;
            }
        });
    }
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { email: email },
                });
                if (!user)
                    return null;
                return new User_1.User(user.id, user.nombre, user.apellidos, user.email, user.password, user.tipo_user, user.id_divece);
            }
            catch (error) {
                console.error("Error: " + error);
                return null;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find();
                return users.map((user) => new User_1.User(user.id, user.nombre, user.apellidos, user.email, user.password, user.tipo_user, user.id_divece));
            }
            catch (error) {
                console.error("Error: " + error);
                return null;
            }
        });
    }
}
exports.RepositoryMysql = RepositoryMysql;
