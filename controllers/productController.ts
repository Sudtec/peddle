import { Request, Response } from "express";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "@prisma/client";
import customJson from "../utils";
import { ProductCreateSchema } from "../models/products";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    product: {
      create({ args, query }: { args: any; query: any }) {
        args.data = ProductCreateSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

exports.getAllProducts = async (req: Request, res: Response) => {
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
              contains: searchTerm as string,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: searchTerm as string,
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

exports.createProduct = async (req: Request, res: Response) => {
  console.log(req.body, "Creation");
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
    console.log(err);
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
