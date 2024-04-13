import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import next from "next";

export async function POST(request: Request) {
    
  const currrentUser = await getCurrentUser();
  
  if (!currrentUser) {
    return NextResponse.error();
  }

  

  const body = await request.json();

 
  const { listingId, startDate, endDate, totalPrice } = body;


  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currrentUser?.id,
          startTime: startDate,
          endDate: endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
