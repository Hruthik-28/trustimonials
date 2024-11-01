-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('text', 'video', 'textAndVideo');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('light', 'dark');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "clerkUserId" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "questions" TEXT[],
    "status" BOOLEAN DEFAULT true,
    "slug" TEXT NOT NULL,
    "collectName" BOOLEAN NOT NULL DEFAULT true,
    "collectEmail" BOOLEAN DEFAULT false,
    "collectCompany" BOOLEAN DEFAULT false,
    "collectSocialLink" BOOLEAN DEFAULT false,
    "collectAddress" BOOLEAN DEFAULT false,
    "collectStarRatings" BOOLEAN NOT NULL DEFAULT true,
    "collectionType" "CollectionType" NOT NULL DEFAULT 'textAndVideo',
    "theme" "Theme" NOT NULL DEFAULT 'light',
    "buttonColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThankYou" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageId" TEXT,
    "hideImage" BOOLEAN DEFAULT false,
    "title" TEXT DEFAULT 'Thank You!',
    "message" TEXT DEFAULT 'Thank you so much for your shoutout! It means a ton for us! 🙏',
    "allowShare" BOOLEAN NOT NULL DEFAULT false,
    "redirectTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThankYou_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "starRating" INTEGER,
    "message" TEXT,
    "name" TEXT,
    "email" TEXT,
    "company" TEXT,
    "socialLink" TEXT,
    "address" TEXT,
    "photoUrl" TEXT,
    "photoId" TEXT,
    "videoUrl" TEXT,
    "videoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThankYou" ADD CONSTRAINT "ThankYou_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
