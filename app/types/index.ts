import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "startTime" | "listing"
>&{
  createdAt: string;
  startTime: string;
  endDate: string;
  listing: SafeListings
}

export type SafeUser = Omit<
  User,
  " createdAt" | "updatedAt" | "emailVerifiedAt"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string;
};
