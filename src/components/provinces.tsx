import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

interface ProvinceSelectProps {
  name?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function ProvinceSelect({
  value,
  onChange,
  placeholder = "Select Province",
  ...props
}: ProvinceSelectProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const provinces = [
    {
      label: "Select a Province / صوبہ منتخب کریں",
      value: "default1",
      disabled: true,
    },
    { en: "Punjab", ur: "پنجاب" },
    { en: "Sindh", ur: "سندھ" },
    { en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
    { en: "Balochistan", ur: "بلوچستان" },
    { en: "Islamabad Capital", ur: "اسلام آباد" },
    { en: "Gilgit-Baltistan", ur: "گلگت بلتستان" },
    { en: "Azad Jammu & Kashmir", ur: "آزاد جموں و کشمیر" },
  ];

  return (
    <Select
      name={props.name}
      required={props.required}
      value={value ?? selectedProvince}
      onValueChange={(val) => {
        setSelectedProvince(val);
        if (onChange) onChange(val);
      }}
    >
      <SelectTrigger>
        {value ?? selectedProvince ? (
          <div className="flex gap-2 font-medium text-zinc-900">
            <span>
              {
                provinces.find(
                  (province) =>
                    typeof province === "object" &&
                    "en" in province &&
                    province.en === (value ?? selectedProvince)
                )?.en
              }
            </span>
            <span className="urdu-text">
              {
                provinces.find(
                  (province) =>
                    typeof province === "object" &&
                    "en" in province &&
                    province.en === (value ?? selectedProvince)
                )?.ur
              }
            </span>
          </div>
        ) : (
          <span className="text-zinc-400 font-normal">{placeholder}</span>
        )}
      </SelectTrigger>
      <SelectContent>
        {provinces.map((province) =>
          "en" in province ? (
            <SelectItem
              className="flex gap-16"
              key={province.en}
              value={province.en || ""}
            >
              <div className="space-y-2 px-2 py-1">
                <div className="urdu-text">{province.ur}</div>
                <div>{province.en}</div>
              </div>
            </SelectItem>
          ) : (
            <SelectItem
              key={province.value || ""}
              value={province.value || ""}
              disabled={province.disabled}
            >
              {province.label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
