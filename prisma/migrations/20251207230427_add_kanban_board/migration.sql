-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('BACKLOG', 'ON_DECK', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "CardPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('TASK', 'RESEARCH', 'DECISION', 'CONFIGURATION', 'BUG', 'FEATURE');

-- CreateTable
CREATE TABLE "KanbanCard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "status" "CardStatus" NOT NULL DEFAULT 'BACKLOG',
    "priority" "CardPriority" NOT NULL DEFAULT 'MEDIUM',
    "type" "CardType" NOT NULL DEFAULT 'TASK',
    "position" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "createdById" TEXT,
    "createdByName" TEXT,
    "assignedToId" TEXT,
    "assignedToName" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KanbanCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KanbanCard_status_idx" ON "KanbanCard"("status");

-- CreateIndex
CREATE INDEX "KanbanCard_isDeleted_idx" ON "KanbanCard"("isDeleted");

-- CreateIndex
CREATE INDEX "KanbanCard_createdById_idx" ON "KanbanCard"("createdById");

-- CreateIndex
CREATE INDEX "KanbanCard_assignedToId_idx" ON "KanbanCard"("assignedToId");
