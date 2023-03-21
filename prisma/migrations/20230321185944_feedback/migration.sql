-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "essay" TEXT NOT NULL,
    "feedback" TEXT,
    "raw_request" JSONB NOT NULL,
    "raw_response" JSONB,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
