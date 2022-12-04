"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
// import { sequelizeConnection } from './App/database/config';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
const port = process.env.APP_PORT || 3333;
app.listen(port, async () => {
    // wait sequelizeConnection.sync();
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
