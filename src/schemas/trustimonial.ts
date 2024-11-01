import { z } from "zod";

export const testimonialSchema = z.object({
  starRating: z.number(),
  message: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  company: z.string().optional(),
  socialLink: z.string().optional(),
  address: z.string().optional(),
  photoUrl: z.string().optional(),
  photoId: z.string().optional(),
  videoUrl: z.string().optional(),
  videoId: z.string().optional(),
  collectionType: z.enum(["text", "video", "textAndVideo"]),
});
