'use strict';
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const routes_1 = __importDefault(require("./routes"));
const db = __importStar(require("./database/config"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
app.use('*', (req, res, next) => {
    let err;
    err = new Error();
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 404);
    res.send(err.status + ". API does not exist.");
});
app.set("port", process.env.PORT || 3001);
const server = app.listen(app.get('port'), () => {
    console.log("Server is running on http://localhost:%d in %s node", app.get("port"), app.get("env"));
});
typeorm_1.createConnection(db.config).then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log("Successfully connected to database");
})).catch(error => console.log("TypeORM connection error: ", error));
exports.default = app;
//# sourceMappingURL=app.js.map