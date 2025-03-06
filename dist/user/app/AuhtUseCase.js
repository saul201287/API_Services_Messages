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
exports.AuthUseCase = void 0;
class AuthUseCase {
    constructor(userRepository, encrypt) {
        this.userRepository = userRepository;
        this.encrypt = encrypt;
    }
    run(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userN = yield this.userRepository.auth(user, password);
                if (userN !== null) {
                    const isPasswordCorrect = yield this.encrypt.compareTo(password, userN.password);
                    if (!isPasswordCorrect) {
                        console.log("error");
                        return null;
                    }
                    return userN.id_divece;
                }
                return null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.AuthUseCase = AuthUseCase;
