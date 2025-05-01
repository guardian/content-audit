-- CreateTable
CREATE TABLE "audit_page_run" (
    "id" SERIAL NOT NULL,
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(2048),

    CONSTRAINT "audit_page_run_pkey" PRIMARY KEY ("id")
);

