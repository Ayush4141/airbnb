import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  " createdAt" | "updatedAt" | "emailVerifiedAt"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string;
};
