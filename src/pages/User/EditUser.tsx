import { getCountries } from "@utils/api";
import { EditComponentProps } from "@utils/definitions";
import React, { useEffect, useState } from "react";
import { CountrySelect } from "./CountrySelect";

const EditComponent = React.memo(
  ({
    isEdit,
    value,
    field,
    styles,
    inputStyle,
    onUpdate,
  }: EditComponentProps) => {
    const [countries, setCountries] = useState<String[]>([]);

    const handleChange = (newValue: string) => {
      onUpdate(field, newValue);
    };

    useEffect(() => {
      async function fetchCountries() {
        const res = await getCountries();
        if (res) setCountries(res);
        return;
      }

      fetchCountries();
    }, []);

    if (!isEdit) return <div className={styles}>{value}</div>;

    if (field === "bio") {
      return (
        <div className="flex flex-col mt-7">
          <label className="mt-4 text-base text-zinc-700 font-semibold">Enter your bio</label>
          <textarea
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full text-zinc-700 border rounded p-2 mt-1"
            rows={4}
          />
        </div>
      );
    }

    if (field === "location") {
      return (
        <div className="flex flex-col gap-2">
          <label className="text-zinc-700 text-base font-semibold">Select Location</label>
          <CountrySelect />
        </div>
      );
    }

    return (
      <div className={`flex flex-col ${field === "role" ? "mt-3" : ""}`}>
        <label className="text-base text-zinc-700 font-semibold">Enter {field}</label>
        <input
          type="text"
          value={value || ""}
          className={`bg-zinc-100 mt-1  border rounded p-1 ${inputStyle}`}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }
);

export default EditComponent;
