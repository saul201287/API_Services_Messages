"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EProduct = void 0;
const typeorm_1 = require("typeorm");
const EUser_1 = require("./EUser");
const EShopping_1 = require("./EShopping");
let EProduct = class EProduct {
};
exports.EProduct = EProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double" }),
    __metadata("design:type", Number)
], EProduct.prototype, "costo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EProduct.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EProduct.prototype, "url_imagen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EShopping_1.EShopping, (shopping) => shopping.product),
    __metadata("design:type", Array)
], EProduct.prototype, "shopping", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EUser_1.EUser, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_user" }),
    __metadata("design:type", EUser_1.EUser)
], EProduct.prototype, "user", void 0);
exports.EProduct = EProduct = __decorate([
    (0, typeorm_1.Entity)("products")
], EProduct);
