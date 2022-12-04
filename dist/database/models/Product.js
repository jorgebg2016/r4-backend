"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Product = _1.sequelize.define('Product', {
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
    category_id: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
});
exports.default = Product;
