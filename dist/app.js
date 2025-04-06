"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const setup_1 = __importDefault(require("./infra/setup"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
new setup_1.default().setupDatabase();
const userController = new user_controller_1.default();
app.use('/api/users', userController.getRouter());
exports.default = app;
