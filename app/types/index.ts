import { Listing, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  " createdAt" | "updatedAt" | "emailVerifiedAt"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string;
};
