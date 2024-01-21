import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
    hotel : HotelType,
}

const SearchResultsCard = ({hotel}:Props) => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-400 rounded-lg p-8 gap-8">
        <div className="w-full h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center hover:scale-105 transform transition duration-[300ms]"
          />
        </div>
        <div className="grid grid-rows-[1fr_2fr_1fr]">
            {/* 1st row which contains starRating,type and name of the hotel */}
          <div>
            <div className="flex items-center">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map((_,index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
              </span>
              <span className="ml-2 text-sm">{hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>
            
            {/* 2nd row which contains the description  */}
          <div>
            <div className="line-clamp-4">{hotel.description}</div>
          </div>

            {/* 3r row which contains the facilities,price and view details for the hotel    */}
          <div className="grid grid-cols-2 items-end whitespace-nowrap">
            <div className="flex gap-[5px] items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span key={facility} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                  {facility}
                </span>
              ))}
              <span className="text-sm">
                {hotel.facilities.length > 3 &&
                  `+${hotel.facilities.length - 3} more`}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">
                ${hotel.pricePerNight} per night
              </span>
              <Link
                to={`/detail/${hotel._id}`}
                className="bg-purple-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-purple-500"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SearchResultsCard;