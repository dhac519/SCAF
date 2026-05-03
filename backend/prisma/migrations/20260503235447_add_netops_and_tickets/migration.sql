/*
  Warnings:

  - Added the required column `updatedAt` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('GENERAL', 'BETTING');

-- CreateEnum
CREATE TYPE "NetOpsPlatform" AS ENUM ('CISCO', 'FORTINET', 'WINDOWS', 'LINUX', 'GENERIC');

-- CreateEnum
CREATE TYPE "NetOpsCategory" AS ENUM ('NETWORKING', 'SECURITY', 'TROUBLESHOOTING', 'SYSTEM');

-- AlterEnum
ALTER TYPE "BetStatus" ADD VALUE 'CASHOUT';

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "walletId" TEXT;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "coingeckoId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "platformId" TEXT,
ADD COLUMN     "symbol" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3),
ADD COLUMN     "modules" TEXT[] DEFAULT ARRAY['FINANCE']::TEXT[];

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "type" "WalletType" NOT NULL DEFAULT 'GENERAL';

-- CreateTable
CREATE TABLE "InvestmentPlatform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentTransaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DECIMAL(20,8) NOT NULL,
    "priceAtDate" DECIMAL(20,8) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investmentId" TEXT NOT NULL,

    CONSTRAINT "InvestmentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WikiFolder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WikiFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WikiTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WikiTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WikiNote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WikiNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipsterBank" (
    "id" TEXT NOT NULL,
    "initialBank" DECIMAL(20,8) NOT NULL,
    "currentBank" DECIMAL(20,8) NOT NULL,
    "unitValue" DECIMAL(20,8) NOT NULL DEFAULT 100,
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipsterBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipsterBet" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipster" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "status" "BetStatus" NOT NULL DEFAULT 'PENDING',
    "stake" DECIMAL(20,8) NOT NULL,
    "odds" DECIMAL(20,8) NOT NULL,
    "unitsProfit" DECIMAL(20,8),
    "amountWagered" DECIMAL(20,8) NOT NULL DEFAULT 0,
    "realProfit" DECIMAL(20,8),
    "cumulativeBalance" DECIMAL(20,8),
    "userId" TEXT NOT NULL,

    CONSTRAINT "TipsterBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetOpsCommand" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "description" TEXT,
    "platform" "NetOpsPlatform" NOT NULL,
    "category" "NetOpsCategory" NOT NULL,
    "isGenerator" BOOLEAN NOT NULL DEFAULT false,
    "variables" JSONB,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NetOpsCommand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipsterBank_userId_key" ON "TipsterBank"("userId");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "InvestmentPlatform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentPlatform" ADD CONSTRAINT "InvestmentPlatform_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentTransaction" ADD CONSTRAINT "InvestmentTransaction_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WikiFolder" ADD CONSTRAINT "WikiFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WikiTopic" ADD CONSTRAINT "WikiTopic_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "WikiFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WikiTopic" ADD CONSTRAINT "WikiTopic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WikiNote" ADD CONSTRAINT "WikiNote_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "WikiTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WikiNote" ADD CONSTRAINT "WikiNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipsterBank" ADD CONSTRAINT "TipsterBank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipsterBet" ADD CONSTRAINT "TipsterBet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetOpsCommand" ADD CONSTRAINT "NetOpsCommand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
