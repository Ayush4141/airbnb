import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Iparams {
  reservationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const currrentUser = await getCurrentUser();

  if (!currrentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currrentUser.id },
        { listing: { userId: currrentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
