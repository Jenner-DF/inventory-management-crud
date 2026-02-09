import * as z from "zod";
import { productBaseSchema } from "./product.schema";

export const formSchema = productBaseSchema.extend({
  id: z.string(), //id of the product
});
