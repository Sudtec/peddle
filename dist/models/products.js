"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreateSchema = void 0;
const zod_1 = require("zod");
exports.ProductCreateSchema = zod_1.z.object({
    productName: zod_1.z.string({
        required_error: "Product Name is required",
    }),
    brand: zod_1.z.string({
        required_error: "Brand is required",
    }),
    upc12: zod_1.z.number().int({ message: "upc12 must be an integer" }),
});
//# sourceMappingURL=products.js.map