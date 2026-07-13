-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'PENDING');

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "PlanType" NOT NULL DEFAULT 'FREE',
    "monthlyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "billingCycle" TEXT NOT NULL DEFAULT 'Monthly',
    "renewalDate" TIMESTAMP(3),
    "cardBrand" TEXT,
    "cardLast4" TEXT,
    "cardExpiry" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "billingId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PAID',
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Billing_userId_key" ON "Billing"("userId");

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
