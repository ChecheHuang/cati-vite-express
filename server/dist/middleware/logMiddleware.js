"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var port = process.env.PORT || 9000;
var url = process.env.BASE_URL || "http://localhost:".concat(port);
var logMiddleware = function (req, res, next) {
    var start = new Date();
    var year = start.getFullYear();
    var month = String(start.getMonth() + 1).padStart(2, "0");
    var day = String(start.getDate()).padStart(2, "0");
    var hours = String(start.getHours()).padStart(2, "0");
    var minutes = String(start.getMinutes()).padStart(2, "0");
    var seconds = String(start.getSeconds()).padStart(2, "0");
    var reqUrl = req.originalUrl || req.url;
    var method = req.method;
    res.on("finish", function () {
        var end = new Date();
        var duration = end.getTime() - start.getTime();
        console.log("".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, " ").concat(method, " ").concat(url).concat(reqUrl, " \u8A08\u6642").concat(duration, "\u6BEB\u79D2"));
    });
    next();
};
exports.default = logMiddleware;
