"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const issues_1 = __importDefault(require("./routes/issues"));
const officials_1 = __importDefault(require("./routes/officials"));
const locations_1 = __importDefault(require("./routes/locations"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/issues", issues_1.default);
app.use("/api/v1/officials", officials_1.default);
app.use("/api/v1/locations", locations_1.default);
exports.default = app;
