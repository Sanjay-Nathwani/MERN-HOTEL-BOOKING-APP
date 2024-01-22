import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useEffect, useState } from "react";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilters from "../components/StarRatingFilters";
import HotelTypeFilters from "../components/HotelTypeFilters";
import FacilityFilters from "../components/FacilityFilters";
import PriceFilters from "../components/PriceFilters";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars,setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes,setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedHotelFacilities,setSelectedHotelFacilities] = useState<string[]>([]);
  const [selectedPrice,setSelectedPrice] = useState<number | undefined>();
  const [sortOption,setSortOption] = useState<string>("");

  // console.log(search);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => 
    apiClient.searchHotels(searchParams)
  );

  const handleStarChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) => 
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  }

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType)
    );
  };

  const handleHotelFacilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedHotelFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, hotelFacility]
        : prevFacilities.filter((facility) => facility !== hotelFacility)
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hotelData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* Left div which contains all the filter options */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          <StarRatingFilters
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
          <HotelTypeFilters
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilityFilters
            selectedHotelFacilities={selectedHotelFacilities}
            onChange={handleHotelFacilityChange}
          />
          <PriceFilters
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Right div which contains the actual content(search results) */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total}{" "}
            {hotelData?.pagination.total === 1 ? "Hotel" : "Hotels"} Found
            {search.destination ? ` In ${search.destination}` : ""}
          </span>

          <select value={sortOption} onChange={(event)=>setSortOption(event.target.value)} className="p-2 border rounded-md">
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
