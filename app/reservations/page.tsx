import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="UnAuthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({ authorId: currentUser.id });


  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations Found"
          subtitle="Looks like you have no reservations for your property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
