import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBed, FaUmbrellaBeach } from "react-icons/fa";
import { DateState, PriceListEntry, Amenities } from "../types";
import Button from "./Button";
import Modal from "./Modal";

interface Props {
  id: number;
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters: number | null;
  pricelistInEuros: PriceListEntry[];
  onReserve: (totalPrice: number, startDate: Date, endDate: Date) => void;
  amenities: Amenities;
}

export default function AccomodationItem({
  title,
  image,
  capacity,
  beachDistanceInMeters,
  pricelistInEuros,
  amenities,
  onReserve,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [dateState, setDateState] = useState<DateState>({
    startDate: null,
    endDate: null,
  });
  const [details, setDetails] = useState<Amenities>();
  const [error, setError] = useState("");
  const [pricePerNight, setPricePerNight] =
    useState<PriceListEntry[]>(pricelistInEuros);

  useEffect(() => {
    setDetails(amenities);
  }, [amenities]);

  const calculateTotalPrice = (): number => {
    const { startDate, endDate } = dateState;
    if (!startDate || !endDate) {
      return 0;
    }

    let totalPrice = 0;
    let currentDate = startDate;

    while (currentDate < endDate) {
      const pricePerNight = pricelistInEuros.find(
        ({ intervalStart, intervalEnd }) => {
          const start = new Date(intervalStart);
          const end = new Date(intervalEnd);

          return currentDate >= start && currentDate < end;
        }
      )?.pricePerNight;

      if (pricePerNight) {
        totalPrice += pricePerNight;
      }

      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return totalPrice;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleStartDateChange = (date: Date | null) => {
    setDateState({ ...dateState, startDate: date });
  };

  const handleEndDateChange = (date: Date | null) => {
    setDateState({ ...dateState, endDate: date });
  };
  const onReserveClick = () => {
    if (dateState.startDate && dateState.endDate) {
      const totalPrice = calculateTotalPrice();
      onReserve(totalPrice, dateState.startDate, dateState.endDate);
    } else {
      setError("Please select start and end dates to make a reservation.");
    }
  };

  return (
    <>
      <div className="h-full w-full">
        <img className="object-cover rounded-xl w-full" src={image} alt="" />
        <div className="mt-3 flex bg-white shadow-lg flex-col gap-3 py-3 rounded-xl px-3 font-light md:font-normal">
          <div className="font-semibold h-12">{title}</div>
          <div className="flex justify-between">
            <FaUmbrellaBeach size={20} /> {beachDistanceInMeters || "N/A"} m
          </div>
          <div className="flex justify-between">
            <FaBed size={20} />
            {capacity}
          </div>
          <DatePicker
            className="z-10"
            selected={dateState.startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={dateState.startDate}
            endDate={dateState.endDate}
            minDate={new Date()}
            maxDate={new Date("2024-12-31")}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select start date"
          />

          <DatePicker
            className="z-10"
            selected={dateState.endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={dateState.startDate}
            endDate={dateState.endDate}
            minDate={dateState.startDate}
            maxDate={new Date("2024-12-31")}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select end date"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            className="w-full bg-blue-500 text-white  px-4 py-2 rounded-md duration-300 hover:bg-blue-600"
            onClick={() => {
              toggleModal();
            }}
          >
            Show more
          </Button>
          <button
            onClick={onReserveClick}
            className="w-full bg-black text-white px-4 py-2 rounded-md duration-300"
          >
            Reserve
          </button>
        </div>

        <Modal
          isOpen={showModal}
          onClose={toggleModal}
          distance={beachDistanceInMeters}
          title={title}
          capacity={capacity}
          amenities={details}
          pricePerNight={pricePerNight}
        />
      </div>
    </>
  );
}
