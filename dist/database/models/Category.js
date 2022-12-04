"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Product_1 = __importDefault(require("./Product"));
const Category = _1.sequelize.define('Category', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: sequelize_1.INTEGER,
        unique: true,
    },
    name: {
        allowNull: false,
        type: sequelize_1.STRING,
    },
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
        beforeCreate: (category) => {
            category.createdAt = new Date();
            category.updatedAt = new Date();
        },
        beforeUpdate: (category) => {
            category.updatedAt = new Date();
        }
    },
});
exports.Category = Category;
Category.hasMany(Product_1.default);
