import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {

    const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md border-4 border-purple-500 group"
    >
      <div className="h-[300px] transition-transform transform-gpu duration-300 group-hover:scale-105">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
            <ScaleLoader
              loading={imageLoading}
              color="#7e22ce"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <img
          src={hotel.imageUrls[0]}
          className={`w-full h-full object-cover object-center ${
            imageLoading ? "hidden" : "" // Hide the image while loading
          }`}
          onLoad={() => setImageLoading(false)} // Set loading state to false once image loads
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
        <span className="block text-sm mt-1 text-white">Click to Visit</span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
