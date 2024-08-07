-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'TEXT_NUMBER', 'MULTIPLE');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "image" TEXT NOT NULL,
    "answers" TEXT[],

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
