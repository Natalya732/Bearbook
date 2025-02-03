export async function getCountries(searchString?: string) {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  const countryList = data.map((item: any) => item.name.official);
  const sortedData = countryList.sort();
  if (searchString) {
    const searchedResult = sortedData.filter((item: string) =>
      item.toLowerCase().includes(searchString.toLowerCase())
    );
    return searchedResult;
  }
  return sortedData;
}
