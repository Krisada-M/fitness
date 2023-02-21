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
exports.connect = exports.myData = void 0;
const dotenv = require("dotenv");
const process_1 = require("process");
const typeorm_1 = require("typeorm");
const typeorm_extension_1 = require("typeorm-extension");
dotenv.config();
exports.myData = new typeorm_1.DataSource({
    type: "mysql",
    host: process_1.env.DB_HOST,
    port: +(process_1.env.DB_PORT || 3306),
    username: process_1.env.DB_USERNAME,
    password: process_1.env.DB_PASSWORD,
    database: process_1.env.DB_NAME,
    entities: ["dist/database/entitys/*.entity.js"],
    charset: "utf8_general_ci",
    logging: false,
    synchronize: true,
});
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_extension_1.createDatabase)();
    yield exports.myData
        .initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
});
exports.connect = connect;
