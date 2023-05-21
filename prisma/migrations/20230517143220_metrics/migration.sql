-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "essayText" TEXT NOT NULL,
    "essayContents" JSONB NOT NULL,
    "essayLength" INTEGER NOT NULL,
    "essayWordCount" INTEGER NOT NULL,
    "essayDeltas" JSONB NOT NULL,
    "clientTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
