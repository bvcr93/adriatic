import { useEffect, useState } from "react";
import AccomodationItem from "./components/AccomodationItem";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { Accommodation, ReservationDetails } from "./types";

export default function App() {
  return (
    <div className="bg-sky-100 min-h-screen">
      <Navbar />
      <div className="maincol pb-20">
        <AccomodationList />
      </div>
    </div>
  );
}

function AccomodationList() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isReserved, setIsReserved] = useState(false);
  const [reservationDetails, setReservationDetails] =
    useState<ReservationDetails | null>(null);

  useEffect(() => {
    fetch("https://api.adriatic.hr/test/accommodation")
      .then((response) => response.json())
      .then((data) => {
        setAccommodations(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  const handleReservation = (
    accommodation: Accommodation,
    totalPrice: number,
    startDate: Date,
    endDate: Date
  ) => {
    setIsReserved(true);
    setReservationDetails({ accommodation, totalPrice, startDate, endDate });
  };

  if (isReserved && reservationDetails) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen space-y-3">
        <h2 className="text-xl font-bold text-center">
          You have successfully reserved accommodation{" "}
          {reservationDetails.accommodation.title}
        </h2>
        <p>
          Date of stay: {reservationDetails.startDate.toLocaleDateString()} -{" "}
          {reservationDetails.endDate.toLocaleDateString()}
        </p>
        <p>
          Total price:{" "}
          <span className="text-blue-500 font-bold text-lg">
            €{reservationDetails.totalPrice}
          </span>{" "}
        </p>

        <Button
          className="bg-black text-white px-4 py-2 rounded mt-2"
          onClick={() => setIsReserved(false)}
        >
          Return to Home Page
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 place-items-center gap-10 mt-20">
        {accommodations.map((accommodation) => (
          <AccomodationItem
            key={accommodation.id}
            {...accommodation}
            onReserve={(totalPrice, startDate, endDate) =>
              handleReservation(accommodation, totalPrice, startDate, endDate)
            }
          />
        ))}
      </div>
    </div>
  );
}
