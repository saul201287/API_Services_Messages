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
exports.AuthUserControll = void 0;
class AuthUserControll {
    constructor(getUserUseCase) {
        this.getUserUseCase = getUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data.username);
            try {
                const userN = yield this.getUserUseCase.run(data.username, data.password);
                console.log(userN);
                if (userN != null) {
                    res.locals.user = userN;
                    //next();
                    res.status(200).json({
                        messages: "Credenciales validas",
                        data: userN,
                    });
                }
                else {
                    res.status(401).json({
                        error: "Credenciales invalidas",
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    error: error,
                });
            }
        });
    }
}
exports.AuthUserControll = AuthUserControll;
