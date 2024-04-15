"use client";

import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: any;
  currentUser: any;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingiD] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingiD(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservations Cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingiD("");
        });
    },
    [router]
  );
  return (
    <>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you have been and where you going "
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {reservations.map((reservation : any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default TripsClient;
