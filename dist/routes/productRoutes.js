"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController = require("../controllers/productController");
const router = express_1.default.Router();
router
    .route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct);
router.route("/:id").put(productController.updateProduct);
module.exports = router;
//# sourceMappingURL=productRoutes.js.map