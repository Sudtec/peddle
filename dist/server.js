"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productRouter = require("./routes/productRoutes");
const app = (0, express_1.default)();
// ** CORS **
let whitelist = [
    "http://localhost:3000",
    "https://peddle-fe.vercel.app/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback("Not allowed by CORS", false);
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/products", productRouter);
const PORT = process.env.PG_PORT || 4000;
app.listen(PORT, () => {
    console.log("Listening");
});
//# sourceMappingURL=server.js.map