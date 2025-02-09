import { getCountries } from "@utils/api";
import { EditComponentProps } from "@utils/definitions";
// import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

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
        <textarea
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full text-gray-700 border rounded p-2 mt-3"
          rows={4}
        />
      );
    }

    if (field === "location") {
      return (
        <div></div>
        // <Dropdown
        //   className="text-black w-full h-fit p-3"
        //   value={value}
        //   options={countries}
        //   placeholder="Select your location"
        //   editable
        //   onChange={(e) => handleChange(e.value)}
        // />
      );
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
