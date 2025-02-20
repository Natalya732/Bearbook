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
      console.log("fasdfas", field, newValue);
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

    console.log("is", isEdit);
    if (!isEdit) return <div className={styles}>{value}</div>;

    if (field === "bio") {
      return (
        <textarea
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full text-gray-700 border rounded p-2 mt-3"
          rows={4}
        />
      );
    }

    if (field === "location") {
      return <CountrySelect />;
    }

    return (
      <input
        type="text"
        value={value || ""}
        className={inputStyle}
        onChange={(e) => handleChange(e.target.value)}
      />
    );
  }
);

export default EditComponent;
