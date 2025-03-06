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
exports.CreateUseCase = void 0;
const User_1 = require("../domain/User");
class CreateUseCase {
    constructor(userRepository, options) {
        this.userRepository = userRepository;
        this.options = options;
    }
    run(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPassword = yield this.options.encodePassword(user.password);
                const userWithEncodedPassword = new User_1.User(user.id, user.nombre, user.apellidos, user.email, newPassword, user.tipo_user, user.id_divece);
                const userNew = yield this.userRepository.create(userWithEncodedPassword);
                if (typeof userNew != null) {
                    return userNew;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.CreateUseCase = CreateUseCase;
