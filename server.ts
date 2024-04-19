const express = require("express");
const productRouter = require('./routes/productRoutes');

import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import customJson from "./utils";
import { ProductCreateSchema } from "./models/products";

// const prisma = new PrismaClient().$extends({
//   query: {
//     product: {
//       create({ args, query }) {
//         args.data = ProductCreateSchema.parse(args.data);
//         return query(args);
//       },
//     },
//   },
// });
const app = express();
app.use(express.json());

app.use('/products', productRouter);


// app.get("/product", async (req: Request, res: Response) => {
//   let orderBy = Object.keys(req.query)[0] || "productName";
//   let orderDir = Object.values(req.query)[0] || "asc";

//   try {
//     const product = await prisma.product.findMany({
//       take: 20,
//       where: {
//         OR: [
//           {
//             productName: {
//               contains: req?.body?.searchTerm || "",
//               mode: "insensitive",
//             },
//           },
//           {
//             brand: {
//               contains: req?.body?.searchTerm || "",
//               mode: "insensitive",
//             },
//           },
//         ],
//       },
//       orderBy: {
//         [orderBy]: orderDir.toString(),
//       },
//     });
//     res.status(200).json({
//       status: "Success",
//       data: {
//         product: JSON.parse(customJson(product)),
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "Failed",
//       message: err,
//     });
//   }
// });
// app.post("/product", async (req: Request, res: Response) => {
//   try {
//     const product = await prisma.product.create({
//       data: req.body,
//     });
//     res.status(201).json({
//       status: "Success",
//       data: {
//         product: JSON.parse(customJson(product)),
//       },
//     });
//   } catch (err: any) {
//     if (
//       err instanceof Prisma.PrismaClientKnownRequestError &&
//       err.code === "P2002"
//     ) {
//       res.status(400).json({
//         status: "Failed",
//         message: "Product with the same UPC12 already exists",
//       });
//     } else {
//       res.status(400).json({
//         status: "Failed",
//         message: err,
//       });
//     }
//   }
// });
// app.put("/product/:id", async (req: Request, res: Response) => {
//   try {
//     // console.log(req.body);
//     const product = await prisma.product.update({
//       where: {
//         id: parseInt(req.params.id),
//       },
//       data: req.body,
//     });
//     res.status(200).json({
//       status: "Success",
//       data: {
//         product: JSON.parse(customJson(product)),
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "Failed",
//       message: err,
//     });
//   }
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening");
});
