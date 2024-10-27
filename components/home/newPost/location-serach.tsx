import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY;

const LocationSearch = ({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: string;
  setSelectedLocation: (input: string) => void;
}) => {
  const [query, setQuery] = useState<string>(""); // State for the search input
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [locations, setLocations] = useState<string[]>([]); // Search results
  const [showCard, setShowCard] = useState<boolean>(false); // Show/Hide card

  // Function to fetch location data (mocked)
  const fetchLocations = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${SEARCH_API_KEY}&q=${query}&format=json`
      ); // Replace with real API
      setLocations(data); // Update locations from API response
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Debounce input for API call
  useEffect(() => {
    if (query.length) {
      const delayDebounce = setTimeout(() => {
        fetchLocations(query);
      }, 500); // Debounce time

      return () => clearTimeout(delayDebounce); // Clean up the timeout on component unmount or query change
    } else {
      setLocations([]); // Clear the locations if query is empty
    }
  }, [query]);

  // Hide card when clicking outside
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div ref={inputRef} className="flex items-center relative group">
      <input
        type="text"
        placeholder="Add location"
        className="border-0 outline-none flex-1 bg-transparent"
        value={selectedLocation || query}
        onChange={(e) => setQuery(e.target.value)} // Update query as the user types
        onFocus={() => setShowCard(true)}
        disabled={!!selectedLocation}
      />
      {selectedLocation ? (
        <X
          className="w-5 h-5 cursor-pointer"
          onClick={() => {
            setSelectedLocation("");
            setQuery("");
            setShowCard(true); // Re-show card when X is clicked
          }}
        />
      ) : (
        <MapPin className="w-5 h-5" />
      )}

      {showCard && !selectedLocation && (
        <Card className="bg-black h-36 overflow-y-scroll w-full absolute top-8 rounded-none border-0">
          {loading ? (
            <div className="flex w-full h-full justify-center items-center">
              <Loader className="text-muted/80 animate-spin w-8 h-8" />
            </div>
          ) : locations?.length > 0 ? (
            locations?.map((location: any, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-700 text-white cursor-pointer"
                onMouseDown={() => {
                  setSelectedLocation(location?.display_name);
                  setShowCard(false); // Hide card after selection
                  setLocations([]);
                  setQuery("");
                }} // Use onMouseDown instead of onClick
              >
                {location?.display_name}
              </div>
            ))
          ) : (
            <div className="p-2 text-white"></div>
          )}
        </Card>
      )}
    </div>
  );
};

export default LocationSearch;
