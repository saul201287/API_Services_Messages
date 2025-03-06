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
exports.EUser = void 0;
const typeorm_1 = require("typeorm");
const EProduct_1 = require("./EProduct");
const EShopping_1 = require("./EShopping");
let EUser = class EUser {
};
exports.EUser = EUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], EUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "tipo_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EUser.prototype, "id_divece", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EProduct_1.EProduct, (product) => product.user),
    __metadata("design:type", Array)
], EUser.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EShopping_1.EShopping, (shopping) => shopping.user),
    __metadata("design:type", Array)
], EUser.prototype, "shopping", void 0);
exports.EUser = EUser = __decorate([
    (0, typeorm_1.Entity)("users")
], EUser);
