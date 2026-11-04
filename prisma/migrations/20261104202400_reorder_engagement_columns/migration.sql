CREATE TABLE "waitlist_emails_new" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consented_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_emails_new_pkey" PRIMARY KEY ("id")
);

INSERT INTO "waitlist_emails_new" ("id", "email", "consented_at", "created_at")
SELECT "id", "email", "consented_at", "created_at" FROM "waitlist_emails";

DROP TABLE "waitlist_emails";
ALTER TABLE "waitlist_emails_new" RENAME TO "waitlist_emails";
ALTER TABLE "waitlist_emails" RENAME CONSTRAINT "waitlist_emails_new_pkey" TO "waitlist_emails_pkey";
CREATE UNIQUE INDEX "waitlist_emails_email_key" ON "waitlist_emails"("email");

CREATE TABLE "feedback_new" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_new_pkey" PRIMARY KEY ("id")
);

INSERT INTO "feedback_new" ("id", "body", "email", "created_at")
SELECT "id", "body", "email", "created_at" FROM "feedback";

DROP TABLE "feedback";
ALTER TABLE "feedback_new" RENAME TO "feedback";
ALTER TABLE "feedback" RENAME CONSTRAINT "feedback_new_pkey" TO "feedback_pkey";
