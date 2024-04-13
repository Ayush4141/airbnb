"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListings, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientPops {
  reservation?: Reservation[];
  listing: SafeListings & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientPops> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates,...range];
    });
    return dates
  }, [reservations]);


  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing?.title}
          imageSrc={listing?.imageSrc}
          locationValue={listing?.locationValue}
          id={listing?.id}
          currentUser={currentUser}
        />
        <div className="grid grid-col-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing?.user}
            category={category}
            description={listing?.category}
            coomCount={listing?.roomCount}
            guestCount={listing?.guestCount}
            bathroomCount={listing?.bathroomCount}
            locationValue={listing?.locationValue}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
