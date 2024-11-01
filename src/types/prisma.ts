// Enums based on the Prisma schema
export enum CollectionType {
  Text = "text",
  Video = "video",
  TextAndVideo = "textAndVideo",
}

export enum Theme {
  Light = "light",
  Dark = "dark",
}

// User Interface
export interface User {
  id: string;
  clerkUserId?: string;
  email: string;
  name?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  spaces: Space[];
}

// Space Interface
export interface Space {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  imageId: string;
  message: string;
  questions: string[];
  status?: boolean;
  slug?: string;
  collectName: boolean;
  collectEmail?: boolean;
  collectCompany?: boolean;
  collectSocialLink?: boolean;
  collectAddress?: boolean;
  collectStarRatings: boolean;
  collectionType: CollectionType;
  theme: Theme;
  buttonColor?: string;
  createdAt: Date;
  updatedAt: Date;
  ThankYou: ThankYou[];
  testimonials: Testimonials[];
  user: User;
}

// ThankYou Interface
export interface ThankYou {
  id: string;
  spaceId: string;
  imageUrl?: string;
  imageId?: string;
  title?: string;
  message?: string;
  hideImage?: boolean;
  allowShare: boolean;
  redirectTo?: string;
  createdAt: Date;
  updatedAt: Date;
  space: Space;
}

// Testimonials Interface
export interface Testimonials {
  id: string;
  spaceId: string;
  starRating?: number;
  message?: string;
  name?: string;
  email?: string;
  company?: string;
  socialLink?: string;
  address?: string;
  photoUrl?: string;
  photoId?: string;
  videoUrl?: string;
  videoId?: string;
  collectionType: CollectionType;
  createdAt: Date;
  updatedAt: Date;
  space: Space;
}
