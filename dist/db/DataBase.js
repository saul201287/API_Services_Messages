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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const signale_1 = require("signale");
dotenv_1.default.config();
const signale = new signale_1.Signale();
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: process.env.NODE_ENV === "production"
        ? ["build/db/entities//*.js"]
        : ["src/db/entities//*.ts"],
    //migrations: ["src/migrations//*.ts"],
    //subscribers: ["src/subscribers//*.ts"],
});
class Database {
    constructor() {
        this.dataSource = AppDataSource;
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dataSource.isInitialized) {
                    yield this.dataSource.initialize();
                    signale.success("Conexión exitosa a la base de datos");
                }
            }
            catch (error) {
                signale.error("Error al conectar con la base de datos:", error);
                throw error;
            }
        });
    }
    getDataSource() {
        return this.dataSource;
    }
}
exports.database = Database.getInstance();
