import React, { ReactNode } from "react";
import { Amenities, PriceListEntry } from "../types";
import {
  FaCheck,
  FaTimes,
  FaSnowflake,
  FaParking,
  FaDog,
  FaSwimmer,
  FaWifi,
  FaTv,
} from "react-icons/fa";
import {} from "react-icons/fa";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  distance: number | null;
  title: string;
  capacity: number;
  amenities: Amenities | undefined;
  pricePerNight: PriceListEntry[];
}
type AmenityKey =
  | "airConditioning"
  | "parkingSpace"
  | "pets"
  | "pool"
  | "wifi"
  | "tv";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  pricePerNight,
  amenities,
}) => {
  if (!isOpen) return null;

  const amenityIcons: Record<AmenityKey, JSX.Element> = {
    airConditioning: <FaSnowflake title="Air Conditioning" />,
    parkingSpace: <FaParking title="Parking Space" />,
    pets: <FaDog title="Pets Allowed" />,
    pool: <FaSwimmer title="Pool" />,
    wifi: <FaWifi title="Wifi" />,
    tv: <FaTv title="TV" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
        <div className="modal relative flex flex-col w-[500px] min-h-[500px] pb-20 py-10 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
          <div className="w-full grid grid-cols-3 space-y-2 place-items-center text-2xl items-center justify-center space-x-2 ">
            {Object.entries(amenities || {}).map(([key, value]) => (
              <div key={key as string} className="flex items-center space-x-2">
                {amenityIcons[key as AmenityKey]}
                {value ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-5">
            <div className="space-y-4 px-10 rounded-xl">
              {pricePerNight.map((price, index) => (
                <div key={index} className="bg-blue-100">
                  {price.intervalStart} - {price.intervalEnd}:{" "}
                  <span className="">
                    Price per night{" "}
                    <span className="text-blue-500">{price.pricePerNight}</span>{" "}
                    <span>EUR</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
