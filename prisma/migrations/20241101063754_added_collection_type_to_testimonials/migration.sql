/*
  Warnings:

  - Added the required column `collectionType` to the `Testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Testimonials" ADD COLUMN     "collectionType" "CollectionType" NOT NULL;
