"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const env = process.env.NODE_ENV || 'development';
const config_1 = __importDefault(require("../config"));
let setting = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(setting.database, setting.username, setting.password, setting);
exports.sequelize = sequelize;
