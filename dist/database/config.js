"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const User_1 = require("./entities/User");
exports.config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "nutriphi",
    synchronize: true,
    logging: false,
    entities: [
        User_1.User
    ]
};
//# sourceMappingURL=config.js.map