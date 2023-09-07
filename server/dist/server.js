"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __importDefault(require("./utils/env"));
(0, env_1.default)();
require("dotenv/config");
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var responseFormatter_1 = __importDefault(require("@/middleware/responseFormatter"));
var logMiddleware_1 = __importDefault(require("@/middleware/logMiddleware"));
var routes_1 = __importDefault(require("@/routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
var publicPath = path_1.default.join(path_1.default.resolve(__dirname, '..'), '/public');
app.use(express_1.default.static(publicPath));
app.use(responseFormatter_1.default);
app.use(logMiddleware_1.default);
app.use('/api', routes_1.default);
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
app.use(function (req, res, next) { return next((0, http_errors_1.default)(404, 'Endpoint not found')); });
app.use(function (err, req, res, next) {
    console.error(err);
    var errorMessage = 'An unknown error occurred: ';
    var statusCode = 500;
    if (err instanceof http_errors_1.default.HttpError) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("\u26A1\uFE0F[".concat(process.env.NODE_ENV, "]: Server is running at http://localhost:").concat(port));
});
