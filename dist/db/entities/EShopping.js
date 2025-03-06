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
exports.EShopping = void 0;
const typeorm_1 = require("typeorm");
const EUser_1 = require("./EUser");
const EProduct_1 = require("./EProduct");
let EShopping = class EShopping {
};
exports.EShopping = EShopping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EShopping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EShopping.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double" }),
    __metadata("design:type", Number)
], EShopping.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EShopping.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EShopping.prototype, "url_imagen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EUser_1.EUser, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_user" }),
    __metadata("design:type", EUser_1.EUser)
], EShopping.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EProduct_1.EProduct, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_product" }),
    __metadata("design:type", EProduct_1.EProduct)
], EShopping.prototype, "product", void 0);
exports.EShopping = EShopping = __decorate([
    (0, typeorm_1.Entity)("shopping")
], EShopping);
