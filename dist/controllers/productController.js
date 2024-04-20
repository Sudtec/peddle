"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const utils_1 = __importDefault(require("../utils"));
const products_1 = require("../models/products");
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter }).$extends({
    query: {
        product: {
            create({ args, query }) {
                args.data = products_1.ProductCreateSchema.parse(args.data);
                return query(args);
            },
        },
    },
});
exports.getAllProducts = async (req, res) => {
    let orderBy = req.query.sort_by || "id";
    let orderDir = req.query.order_by || "desc";
    let searchTerm = req.query.filter || "";
    try {
        const product = await prisma.product.findMany({
            take: 20,
            where: {
                OR: [
                    {
                        productName: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                    {
                        brand: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            orderBy: {
                [orderBy.toString()]: orderDir.toString(),
            },
        });
        res.status(200).json({
            status: "Success",
            data: {
                product: JSON.parse((0, utils_1.default)(product)),
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: "Failed",
            message: err,
        });
    }
};
exports.createProduct = async (req, res) => {
    console.log(req.body, "Creation");
    try {
        const product = await prisma.product.create({
            data: req.body,
        });
        res.status(201).json({
            status: "Success",
            data: {
                product: JSON.parse((0, utils_1.default)(product)),
            },
        });
    }
    catch (err) {
        console.log(err);
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002") {
            res.status(400).json({
                status: "Failed",
                message: "Product with the same UPC12 already exists",
            });
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: err,
            });
        }
    }
};
exports.updateProduct = async (req, res) => {
    try {
        // console.log(req.body);
        const product = await prisma.product.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });
        res.status(200).json({
            status: "Success",
            data: {
                product: JSON.parse((0, utils_1.default)(product)),
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: "Failed",
            message: err,
        });
    }
};
//# sourceMappingURL=productController.js.map