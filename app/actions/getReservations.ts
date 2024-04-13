import prisma from "@/app/libs/prismadb";
interface Iparams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservation(params: Iparams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (!listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.authorId = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const SafeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startTime: reservation.startTime.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return SafeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
