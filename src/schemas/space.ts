import { z } from "zod";

export const spaceSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  imageId: z.string(),
  message: z.string(),
  questions: z.array(z.string()),
  status: z.boolean(),
  collectName: z.boolean(),
  collectEmail: z.boolean(),
  collectCompany: z.boolean(),
  collectSocialLink: z.boolean(),
  collectAddress: z.boolean(),
  collectStarRatings: z.boolean(),
  collectionType: z.enum(["text", "video", "textAndVideo"]),
  theme: z.enum(["light", "dark"]),
  buttonColor: z.string().optional(),
});
