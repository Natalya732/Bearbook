import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CountrySelect({ error }: { error: string }) {
  return (
    <Select>
      <SelectTrigger
        className={`w-[280px] bg-white/90 text-zinc-900 border border-blue-300 focus:border-purple-500 rounded-lg p-2 shadow-md outline-none focus:ring-2 focus:ring-purple-400  ${
          error ? "border-red-500 border-2" : ""
        }`}
      >
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md rounded-lg">
        <SelectGroup>
          <SelectLabel className="text-blue-600 font-semibold">
            North America
          </SelectLabel>
          <SelectItem
            value="est"
            className="p-2 text-zinc-800 hover:bg-gradient-to-r from-blue-400 to-purple-500 hover:text-white rounded-md"
          >
            Eastern Standard Time (EST)
          </SelectItem>
          <SelectItem value="cst" className="p-2 hover:gradient-item">
            Central Standard Time (CST)
          </SelectItem>
          <SelectItem value="mst" className="p-2 hover:gradient-item">
            Mountain Standard Time (MST)
          </SelectItem>
          <SelectItem value="pst" className="p-2 hover:gradient-item">
            Pacific Standard Time (PST)
          </SelectItem>
          <SelectItem value="akst" className="p-2 hover:gradient-item">
            Alaska Standard Time (AKST)
          </SelectItem>
          <SelectItem value="hst" className="p-2 hover:gradient-item">
            Hawaii Standard Time (HST)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-blue-600 font-semibold">
            Europe & Africa
          </SelectLabel>
          <SelectItem value="gmt" className="p-2 hover:gradient-item">
            Greenwich Mean Time (GMT)
          </SelectItem>
          <SelectItem value="cet" className="p-2 hover:gradient-item">
            Central European Time (CET)
          </SelectItem>
          <SelectItem value="eet" className="p-2 hover:gradient-item">
            Eastern European Time (EET)
          </SelectItem>
          <SelectItem value="west" className="p-2 hover:gradient-item">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat" className="p-2 hover:gradient-item">
            Central Africa Time (CAT)
          </SelectItem>
          <SelectItem value="eat" className="p-2 hover:gradient-item">
            East Africa Time (EAT)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-blue-600 font-semibold">
            Asia
          </SelectLabel>
          <SelectItem value="msk" className="p-2 hover:gradient-item">
            Moscow Time (MSK)
          </SelectItem>
          <SelectItem value="ist" className="p-2 hover:gradient-item">
            India Standard Time (IST)
          </SelectItem>
          <SelectItem value="cst_china" className="p-2 hover:gradient-item">
            China Standard Time (CST)
          </SelectItem>
          <SelectItem value="jst" className="p-2 hover:gradient-item">
            Japan Standard Time (JST)
          </SelectItem>
          <SelectItem value="kst" className="p-2 hover:gradient-item">
            Korea Standard Time (KST)
          </SelectItem>
          <SelectItem value="ist_indonesia" className="p-2 hover:gradient-item">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-blue-600 font-semibold">
            Australia & Pacific
          </SelectLabel>
          <SelectItem value="awst" className="p-2 hover:gradient-item">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst" className="p-2 hover:gradient-item">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest" className="p-2 hover:gradient-item">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst" className="p-2 hover:gradient-item">
            New Zealand Standard Time (NZST)
          </SelectItem>
          <SelectItem value="fjt" className="p-2 hover:gradient-item">
            Fiji Time (FJT)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="text-blue-600 font-semibold">
            South America
          </SelectLabel>
          <SelectItem value="art" className="p-2 hover:gradient-item">
            Argentina Time (ART)
          </SelectItem>
          <SelectItem value="bot" className="p-2 hover:gradient-item">
            Bolivia Time (BOT)
          </SelectItem>
          <SelectItem value="brt" className="p-2 hover:gradient-item">
            Brasilia Time (BRT)
          </SelectItem>
          <SelectItem value="clt" className="p-2 hover:gradient-item">
            Chile Standard Time (CLT)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
