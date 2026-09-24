-- Schema iniziale — generato da `prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script`.
-- Netlify applica questo file al database Postgres (Neon) al deploy; prisma/schema.prisma resta
-- la fonte di verità: ogni modifica futura allo schema produce una NUOVA migrazione qui, mai
-- una modifica a questa (Netlify non permette di cambiare una migrazione già applicata).

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Learner" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitialProfile" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "values" JSONB NOT NULL,
    "rawAnswers" JSONB NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InitialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressState" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentResponse" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    "tutorAssisted" BOOLEAN,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreeReflection" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "writtenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreeReflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorMessage" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "pathId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Learner_email_key" ON "Learner"("email");

-- CreateIndex
CREATE INDEX "Learner_organizationId_idx" ON "Learner"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_learnerId_idx" ON "Session"("learnerId");

-- CreateIndex
CREATE UNIQUE INDEX "InitialProfile_learnerId_pathId_courseId_key" ON "InitialProfile"("learnerId", "pathId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressState_learnerId_pathId_courseId_chapterId_key" ON "ProgressState"("learnerId", "pathId", "courseId", "chapterId");

-- CreateIndex
CREATE INDEX "AssessmentResponse_learnerId_pathId_courseId_chapterId_idx" ON "AssessmentResponse"("learnerId", "pathId", "courseId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentResponse_learnerId_pathId_courseId_chapterId_key_key" ON "AssessmentResponse"("learnerId", "pathId", "courseId", "chapterId", "key");

-- CreateIndex
CREATE INDEX "FreeReflection_learnerId_pathId_courseId_chapterId_idx" ON "FreeReflection"("learnerId", "pathId", "courseId", "chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "FreeReflection_learnerId_pathId_courseId_chapterId_key_key" ON "FreeReflection"("learnerId", "pathId", "courseId", "chapterId", "key");

-- CreateIndex
CREATE INDEX "TutorMessage_learnerId_pathId_courseId_createdAt_idx" ON "TutorMessage"("learnerId", "pathId", "courseId", "createdAt");

-- AddForeignKey
ALTER TABLE "Learner" ADD CONSTRAINT "Learner_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitialProfile" ADD CONSTRAINT "InitialProfile_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressState" ADD CONSTRAINT "ProgressState_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentResponse" ADD CONSTRAINT "AssessmentResponse_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreeReflection" ADD CONSTRAINT "FreeReflection_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorMessage" ADD CONSTRAINT "TutorMessage_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
