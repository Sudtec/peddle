import { z } from "zod";
import { Prisma } from "@prisma/client";

export const ProductCreateSchema = z.object({
  productName: z.string({
    required_error: "Product Name is required",
  }),
  brand: z.string({
    required_error: "Brand is required",
  }),
  upc12: z.number().int({ message: "upc12 must be an integer" }),
}) satisfies z.Schema<Prisma.ProductUncheckedCreateInput>;
