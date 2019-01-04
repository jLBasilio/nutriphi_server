'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
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
    console.log("App is running on http://localhost:%d in %s node", app.get("port"), app.get("env"));
});
exports.default = app;
//# sourceMappingURL=app.js.map