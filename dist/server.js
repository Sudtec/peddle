"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRouter = require("./routes/productRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/products", productRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Listening");
});
//# sourceMappingURL=server.js.map