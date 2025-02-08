import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";


interface CitySelectProps {
  name?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function CitySelect({
  value,
  onChange,
  placeholder = "Select City",
  ...props
}: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = [
    {
      label: "Select The City / شہر منتخب کریں",
      value: "default1",
      disabled: true,
    },
    { en: "Islamabad", ur: "اسلام آباد" },
    { en: "Ahmed Nager Chatha", ur: "احمد نگر چٹھہ" },
    { en: "Ahmadpur East", ur: "احمدپور ایسٹ" },
    { en: "Ali Khan Abad", ur: "علی خان آباد" },
    { en: "Alipur", ur: "علی پور" },
    { en: "Arifwala", ur: "عارف والا" },
    { en: "Attock", ur: "اٹک" },
    { en: "Bhera", ur: "بھیرہ" },
    { en: "Bhalwal", ur: "بہلوال" },
    { en: "Bahawalnagar", ur: "بہاولنگر" },
    { en: "Bahawalpur", ur: "بہاولپور" },
    { en: "Bhakkar", ur: "بھکر" },
    { en: "Burewala", ur: "بوریوالا" },
    { en: "Chillianwala", ur: "چلیاں والا" },
    { en: "Chakwal", ur: "چکوال" },
    { en: "Chichawatni", ur: "چیچہ وطنی" },
    { en: "Chiniot", ur: "چنیوٹ" },
    { en: "Chishtian", ur: "چشتیاں" },
    { en: "Daska", ur: "ڈسکہ" },
    { en: "Darya Khan", ur: "دریا خان" },
    { en: "Dera Ghazi Khan", ur: "ڈیرہ غازی خان" },
    { en: "Dhaular", ur: "ڈھولر" },
    { en: "Dina", ur: "دینہ" },
    { en: "Dinga", ur: "ڈنگہ" },
    { en: "Dipalpur", ur: "دیپالپور" },
    { en: "Faisalabad", ur: "فیصل آباد" },
    { en: "Ferozewala", ur: "فیروزوالا" },
    { en: "Fateh Jang", ur: "فتح جنگ" },
    { en: "Ghakhar Mandi", ur: "گھکھر منڈی" },
    { en: "Gojra", ur: "گوجرہ" },
    { en: "Gujranwala", ur: "گوجرانوالہ" },
    { en: "Gujrat", ur: "گجرات" },
    { en: "Gujar Khan", ur: "گجر خان" },
    { en: "Hafizabad", ur: "حافظ آباد" },
    { en: "Haroonabad", ur: "ہارون آباد" },
    { en: "Hasilpur", ur: "حاصل پور" },
    { en: "Haveli Lakha", ur: "حویلی لکھا" },
    { en: "Jatoi", ur: "جتوئی" },
    { en: "Jalalpur", ur: "جلال پور" },
    { en: "Jattan", ur: "جٹاں" },
    { en: "Jampur", ur: "جام پور" },
    { en: "Jaranwala", ur: "جڑانوالہ" },
    { en: "Jhang", ur: "جھنگ" },
    { en: "Jhelum", ur: "جہلم" },
    { en: "Kalabagh", ur: "کالاباغ" },
    { en: "Karor Lal Esan", ur: "کرور لعل عیسن" },
    { en: "Kasur", ur: "قصور" },
    { en: "Kamalia", ur: "کمالیہ" },
    { en: "Kamoke", ur: "کاموکی" },
    { en: "Khanewal", ur: "خانیوال" },
    { en: "Khanpur", ur: "خان پور" },
    { en: "Kharian", ur: "کھاریاں" },
    { en: "Khushab", ur: "خوشاب" },
    { en: "Kot Addu", ur: "کوٹ ادو" },
    { en: "Jauharabad", ur: "جوہر آباد" },
    { en: "Lahore", ur: "لاہور" },
    { en: "Lalamusa", ur: "لالہ موسی" },
    { en: "Layyah", ur: "لیہ" },
    { en: "Liaquat Pur", ur: "لیاقت پور" },
    { en: "Lodhran", ur: "لودھراں" },
    { en: "Malakwal", ur: "ملک وال" },
    { en: "Mamoori", ur: "ماموری" },
    { en: "Mailsi", ur: "میلسی" },
    { en: "Mandi Bahauddin", ur: "منڈی بہاؤالدین" },
    { en: "Mian Channu", ur: "میاں چنوں" },
    { en: "Mianwali", ur: "میانوالی" },
    { en: "Multan", ur: "ملتان" },
    { en: "Murree", ur: "مری" },
    { en: "Muridke", ur: "مریدکے" },
    { en: "Mianwali Bangla", ur: "میانوالی بنگلہ" },
    { en: "Muzaffargarh", ur: "مظفر گڑھ" },
    { en: "Narowal", ur: "نارووال" },
    { en: "Nankana Sahib", ur: "ننکانہ صاحب" },
    { en: "Okara", ur: "اوکاڑہ" },
    { en: "Renala Khurd", ur: "رینالہ خورد" },
    { en: "Pakpattan", ur: "پاکپتن" },
    { en: "Pattoki", ur: "پتوکی" },
    { en: "Pir Mahal", ur: "پیر محل" },
    { en: "Qaimpur", ur: "قائم پور" },
    { en: "Qila Didar Singh", ur: "قلعہ دیدار سنگھ" },
    { en: "Rabwah", ur: "ربوہ" },
    { en: "Raiwind", ur: "رائے ونڈ" },
    { en: "Rajanpur", ur: "راجن پور" },
    { en: "Rahim Yar Khan", ur: "رحیم یار خان" },
    { en: "Rawalpindi", ur: "راولپنڈی" },
    { en: "Sadiqabad", ur: "صادق آباد" },
    { en: "Safdarabad", ur: "صفدر آباد" },
    { en: "Sahiwal", ur: "ساہیوال" },
    { en: "Sangla Hill", ur: "سانگلہ ہل" },
    { en: "Sarai Alamgir", ur: "سرائے عالمگیر" },
    { en: "Sargodha", ur: "سرگودھا" },
    { en: "Shakargarh", ur: "شکر گڑھ" },
    { en: "Sheikhupura", ur: "شیخوپورہ" },
    { en: "Sialkot", ur: "سیالکوٹ" },
    { en: "Sohawa", ur: "سوہاوہ" },
    { en: "Soianwala", ur: "سویاں والا" },
    { en: "Siranwali", ur: "سیراںوالی" },
    { en: "Talagang", ur: "تلہ گنگ" },
    { en: "Taxila", ur: "ٹیکسلا" },
    { en: "Toba Tek Singh", ur: "ٹوبہ ٹیک سنگھ" },
    { en: "Vehari", ur: "وہاڑی" },
    { en: "Wah Cantonment", ur: "واہ کینٹ" },
    { en: "Wazirabad", ur: "وزیر آباد" },
  ];

  return (
    <Select
      name={props.name}
      required={props.required}
      value={value ?? selectedCity}
      onValueChange={(val) => {
        setSelectedCity(val);
        if (onChange) onChange(val);
      }}
    >
      <SelectTrigger>
        {value ?? selectedCity ? (
          <div className="flex gap-2 font-medium text-zinc-900">
            <span>
              {
                cities.find(
                  (city) =>
                    typeof city === "object" &&
                    "en" in city &&
                    city.en === (value ?? selectedCity)
                )?.en
              }
            </span>
            <span className="urdu-text">
              {
                cities.find(
                  (city) =>
                    typeof city === "object" &&
                    "en" in city &&
                    city.en === (value ?? selectedCity)
                )?.ur
              }
            </span>
          </div>
        ) : (
          <span className="text-zinc-400 font-normal">{placeholder}</span>
        )}
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) =>
          "en" in city ? (
            <SelectItem
              className="flex gap-16"
              key={city.en}
              value={city.en || ""}
            >
              <div className="space-y-2 px-2 py-1">
                <div className="urdu-text">{city.ur}</div>
                <div>{city.en}</div>
              </div>
            </SelectItem>
          ) : (
            <SelectItem
              key={city.value || ""}
              value={city.value || ""}
              disabled={city.disabled}
            >
              {city.label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
