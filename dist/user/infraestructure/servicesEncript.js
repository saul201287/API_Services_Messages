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
exports.EncryptServices = void 0;
const bcryptjs_1 = require("bcryptjs");
class EncryptServices {
    encodePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPassword = yield (0, bcryptjs_1.hash)(password, Number(process.env.SECRET_JUMP));
            return newPassword;
        });
    }
    compareTo(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, bcryptjs_1.compare)(password, hashedPassword);
                return result;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.EncryptServices = EncryptServices;
