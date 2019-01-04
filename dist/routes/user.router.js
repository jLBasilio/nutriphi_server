"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("../database/entities/User");
const router = express_1.default.Router();
router.get('/findall', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield typeorm_1.getManager().getRepository(User_1.User).find();
        if (typeof (result) !== 'undefined') {
            const data = {
                status: 200,
                message: "Users found.",
                items: result
            };
            res.status(data.status).json(data);
        }
        else {
            const data = {
                status: 404,
                message: "No users.",
            };
            res.status(data.status).json(data);
        }
    }
    catch (err) {
        res.status(err.status).json(err);
    }
}));
router.get('/findone/id/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield typeorm_1.getManager().getRepository(User_1.User).findOne(id);
        if (typeof (result) !== 'undefined') {
            const data = {
                status: 200,
                message: "User found.",
                items: result
            };
            res.status(data.status).json(data);
        }
        else {
            const data = {
                status: 404,
                message: "User not found",
            };
            res.status(data.status).json(data);
        }
    }
    catch (err) {
        res.status(err.status).json(err);
    }
}));
router.get('/findone/username', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userName } = req.body;
        const result = yield typeorm_1.getManager().getRepository(User_1.User).findOne({ userName });
        if (typeof (result) !== 'undefined') {
            const data = {
                status: 200,
                message: "User found.",
                items: result
            };
            res.status(data.status).json(data);
        }
        else {
            const data = {
                status: 404,
                message: "User not found",
            };
            res.status(data.status).json(data);
        }
    }
    catch (err) {
        res.status(err.status).json(err);
    }
}));
router.post('/add', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newUser = new User_1.User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.userName = req.body.userName;
        newUser.age = req.body.age;
        const result = yield typeorm_1.getManager().getRepository(User_1.User).save(newUser);
        const data = {
            status: 200,
            message: "Successfully added user.",
            items: result
        };
        res.status(data.status).json(data);
    }
    catch (err) {
        res.status(err.status).json(err);
    }
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map