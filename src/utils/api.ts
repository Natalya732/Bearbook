import { GetCountriesResponse } from "./definitions";

export async function getCountries(
  searchString: string,
  pageNum: number,
): Promise<GetCountriesResponse> {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  const countryList = data.map((item: any) => item.name.official).sort();
  const totalCount = countryList.length;

  const filteredList = searchString
    ? countryList.filter((country: string) =>
        country.toLowerCase().includes(searchString.toLowerCase())
      )
    : countryList;

  const pageStart = (pageNum - 1) * 20;
  const pageEnd = pageStart + 20;

  const paginatedData = filteredList.slice(pageStart, pageEnd);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: paginatedData,
        totalCount,
      });
    }, 3000);
  });
}
