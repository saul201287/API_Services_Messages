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
exports.UpdateProductUseCase = void 0;
class UpdateProductUseCase {
    constructor(productRepository, services) {
        this.productRepository = productRepository;
        this.services = services;
    }
    run(id, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productNew = yield this.productRepository.update(id, cantidad);
                if (typeof productNew != null) {
                    if (yield this.services.run("add-products", "¡El producto que esperabas ya esta disponible!", `Se han añadido mas ${productNew} al Stok.`)) {
                        return productNew;
                    }
                    else {
                        return null;
                    }
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
exports.UpdateProductUseCase = UpdateProductUseCase;
