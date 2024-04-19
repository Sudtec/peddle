import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import customJson from "../utils";
import { ProductCreateSchema } from '../models/products';

const prisma = new PrismaClient().$extends({
  query: {
    product: {
      create({ args, query }) {
        args.data = ProductCreateSchema.parse(args.data);
        return query(args);
      },
    },
  },
});


exports.getAllProducts = async (req: Request, res: Response) => {
  let orderBy = Object.keys(req.query)[0] || "id";
  let orderDir = Object.values(req.query)[0] || "desc";

  try {
    const product = await prisma.product.findMany({
      take: 20,
      where: {
        OR: [
          {
            productName: {
              contains: req?.body?.searchTerm || "",
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: req?.body?.searchTerm || "",
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        [orderBy]: orderDir.toString(),
      },
    });
    res.status(200).json({
      status: "Success",
      data: {
        product: JSON.parse(customJson(product)),
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json({
      status: "Success",
      data: {
        product: JSON.parse(customJson(product)),
      },
    });
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      res.status(400).json({
        status: "Failed",
        message: "Product with the same UPC12 already exists",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: err,
      });
    }
  }
};

exports.updateProduct = async (req: Request, res: Response) => {
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
        product: JSON.parse(customJson(product)),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};