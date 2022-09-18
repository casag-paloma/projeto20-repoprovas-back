"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const testRoute_1 = __importDefault(require("./testRoute"));
const route = (0, express_1.Router)();
route.use(authRoute_1.default);
route.use(testRoute_1.default);
exports.default = route;
