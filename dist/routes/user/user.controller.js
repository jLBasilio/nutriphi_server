"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../../database/entities/User");
exports.test = () => {
    return new Promise((resolve, reject) => {
        console.log("Test");
        return resolve(true);
    });
};
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        const found = typeorm_1.getManager().getRepository(User_1.User).findOne(id);
        if (found) {
            console.log(found);
            return resolve(found);
        }
        else {
            return reject(new Error("Not found"));
        }
    });
};
exports.findOne = (req) => {
    return new Promise((resolve, reject) => {
        console.log("========== ENTERED FINDONE");
        const userName = req.body.userName;
        const found = typeorm_1.getManager().getRepository(User_1.User).findOne({ userName });
        if (found) {
            console.log(found);
            return resolve(found);
        }
        else {
            return reject(new Error("Not found"));
        }
    });
};
exports.addUser = (req) => {
    return new Promise((resolve, reject) => {
        const newUser = new User_1.User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.userName = req.body.userName;
        newUser.age = req.body.age;
        const status = typeorm_1.getManager().getRepository(User_1.User);
        if (!status) {
            return reject({
                status: 500,
                message: 'Error while adding user',
                err: null
            });
        }
        return resolve(status.save(newUser));
    });
};
//# sourceMappingURL=user.controller.js.map