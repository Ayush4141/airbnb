"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListings, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

interface ListingClientPops {
  reservation?: Reservation[];
  listing?: SafeListings & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientPops> = ({
  reservation,
  listing,
  currentUser,
}) => {

  

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);
  console.log("hiii",listing)

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
      </div>
    </Container>
  );
};

export default ListingClient;
