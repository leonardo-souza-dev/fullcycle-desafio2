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
const express_1 = require("express");
const db_1 = __importDefault(require("../infra/db"));
const faker_1 = require("@faker-js/faker");
class UserController {
    constructor() {
        this.TITLE = "<h1>Full Cycle Rocks!</h1>";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', this.getAll.bind(this));
    }
    getAll(request, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = faker_1.faker.person.fullName();
            try {
                const [resultInsert] = yield db_1.default.query(`INSERT INTO users (name) VALUES (?)`, [name]);
                const [users] = yield db_1.default.query('SELECT * FROM users');
                const separatorItems = '\r\n- ';
                const result = this.TITLE + separatorItems + users.map((user) => user.name).join(separatorItems);
                console.log('Result:');
                console.log(result);
                res.status(201).json(result);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error creating user.' + error });
            }
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserController;
