import { getCountries } from "@utils/api";
import { EditComponentProps } from "@utils/definitions";
import React, { useEffect, useState } from "react";
import { CountrySelect } from "./CountrySelect";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";

const EditComponent = React.memo(
  ({ isEdit, value, field, styles, error, onUpdate }: EditComponentProps) => {
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

    if (!isEdit) return <div className={styles}>{value || `No ${field}`}</div>;

    if (field === "bio") {
      return (
        <div className={`grid w-full gap-1.5 mt-3 `}>
          <Label
            htmlFor="message"
            className="drop-shadow-md text-sm sm:text-base font-medium"
          >
            Enter bio <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={value || ""}
            className={`w-full bg-white/90 text-zinc-900 border border-blue-300 focus:border-purple-500 rounded-lg p-2 shadow-md outline-none focus:ring-2 focus:ring-purple-400 ${
              error ? "border-red-500 border-2" : ""
            }`}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Write about yourself..."
            id="message"
          />
          <span className="text-red-500">{error}</span>
        </div>
      );
    }

    if (field === "location") {
      return (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="message"
            className="drop-shadow-md text-sm sm:text-base font-medium"
          >
            Select Location <span className="text-red-500">*</span>
          </Label>
          <CountrySelect error={error ?? ""} />
          <span className="text-red-500">{error}</span>
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col gap-2 w-full max-w-sm items-start ${
          field === "role" ? "mt-3" : ""
        }`}
      >
        <Label
          htmlFor={field}
          className="drop-shadow-md text-sm sm:text-base font-medium"
        >
          {field.charAt(0).toUpperCase().concat(field.slice(1, field.length))}{" "}
          {["name", "role", "email"].includes(field) && (
            <span className="text-red-500">*</span>
          )}
        </Label>
        <Input
          type={field === "email" ? "email" : "text"}
          value={value || ""}
          id={field}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={`Enter ${field}`}
          className={`w-full bg-white/90 text-zinc-900 border border-blue-300 focus:border-purple-500 rounded-lg p-2 shadow-md outline-none focus:ring-2 focus:ring-purple-400 ${
            error ? "border-red-500 border-2" : ""
          }`}
        />
        <span className="text-red-500 flex w-fit">{error}</span>
      </div>
    );
  }
);

export default EditComponent;
