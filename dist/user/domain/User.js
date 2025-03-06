"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, nombre, apellidos, email, password, tipo_user, id_divece) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.tipo_user = tipo_user;
        this.id_divece = id_divece;
    }
}
exports.User = User;
