import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Position name is required" }).min(3, {
    message: "Position name must be at least 3 characters",
  }),
  description: z
    .string()
    .nonempty({ message: "Position description is required" })
    .min(10, {
      message: "Position description must be at least 3 characters",
    }),
  parentId: z.string().optional(),
});

export const adminSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default schema;
