import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getCountries } from "@utils/api";
import { Loader } from "react-feather";
import { GetCountriesResponse } from "@utils/definitions";

export function CountrySelect({
  error,
  onChange,
}: {
  error: string;
  onChange: (val: string) => void;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalCount: 0,
  });
  const [countries, setCountries] = useState<string[]>([]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCountries() {
      setIsLoading(pagination.page === 1);
      const { data, totalCount }: GetCountriesResponse = await getCountries(
        searchString,
        pagination.page
      );

      setCountries((prev) => [...prev, ...data]);
      setPagination((prev) => ({ ...prev, totalCount }));
      setIsLoading(false);
    }

    fetchCountries();
  }, [searchString, pagination.page]);

  function handleScroll() {
    if (!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (
      scrollTop + clientHeight > scrollHeight - 20 &&
      countries.length < pagination.totalCount
    ) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[280px] text-left flex ${
            error ? "border-red-500 border-2" : ""
          }`}
        >
          <span className="w-full items-start">
            {selectedCountry || "Select a country"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2 bg-white shadow-md rounded-lg">
        <Command>
          <CommandInput
            value={searchString}
            onValueChange={(value) => setSearchString(value)}
          />
          <CommandList
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-[200px] overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex justify-center items-center min-h-20">
                <Loader className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : (
              <CommandGroup>
                {countries.length > 0 ? (
                  countries.map((country) => (
                    <CommandItem
                      key={country}
                      onSelect={() => {
                        onChange(country);
                        setSelectedCountry(country);
                        setOpen(false);
                      }}
                    >
                      {country}
                    </CommandItem>
                  ))
                ) : (
                  <div className="text-center text-gray-500 p-2">
                    No results found
                  </div>
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
