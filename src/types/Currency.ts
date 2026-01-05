export type CurrencySymbol =
  | "$" // USD - US Dollar
  | "€" // EUR - Euro
  | "£" // GBP - British Pound
  | "¥" // JPY/CNY - Japanese Yen / Chinese Yuan
  | "₹" // INR - Indian Rupee
  | "₽" // RUB - Russian Ruble
  | "₩" // KRW - South Korean Won
  | "₪" // ILS - Israeli Shekel
  | "₦" // NGN - Nigerian Naira
  | "₨" // PKR - Pakistani Rupee
  | "₫" // VND - Vietnamese Dong
  | "₱" // PHP - Philippine Peso
  | "₴" // UAH - Ukrainian Hryvnia
  | "₵" // GHS - Ghanaian Cedi
  | "₸" // KZT - Kazakhstani Tenge
  | "₺" // TRY - Turkish Lira
  | "₼" // AZN - Azerbaijani Manat
  | "₾" // GEL - Georgian Lari
  | "₿"; // BTC - Bitcoin

export interface Currency {
  symbol: CurrencySymbol;
  name: string;
  iso: string;
}

export const CURRENCIES: {
  symbol: CurrencySymbol;
  name: string;
  iso: string;
}[] = [
  { symbol: "$", name: "USD - US Dollar", iso: "USD" },
  { symbol: "€", name: "EUR - Euro", iso: "EUR" },
  { symbol: "£", name: "GBP - British Pound", iso: "GBP" },
  { symbol: "¥", name: "JPY/CNY - Japanese Yen / Chinese Yuan", iso: "JPY" },
  { symbol: "₹", name: "INR - Indian Rupee", iso: "INR" },
  { symbol: "₽", name: "RUB - Russian Ruble", iso: "RUB" },
  { symbol: "₩", name: "KRW - South Korean Won", iso: "KRW" },
  { symbol: "₪", name: "ILS - Israeli Shekel", iso: "ILS" },
  { symbol: "₦", name: "NGN - Nigerian Naira", iso: "NGN" },
  { symbol: "₨", name: "PKR - Pakistani Rupee", iso: "PKR" },
  { symbol: "₫", name: "VND - Vietnamese Dong", iso: "VND" },
  { symbol: "₱", name: "PHP - Philippine Peso", iso: "PHP" },
  { symbol: "₴", name: "UAH - Ukrainian Hryvnia", iso: "UAH" },
  { symbol: "₵", name: "GHS - Ghanaian Cedi", iso: "GHS" },
  { symbol: "₸", name: "KZT - Kazakhstani Tenge", iso: "KZT" },
  { symbol: "₺", name: "TRY - Turkish Lira", iso: "TRY" },
  { symbol: "₼", name: "AZN - Azerbaijani Manat", iso: "AZN" },
  { symbol: "₾", name: "GEL - Georgian Lari", iso: "GEL" },
  { symbol: "₿", name: "BTC - Bitcoin", iso: "BTC" },
];

export const BASE_CURRENCY = CURRENCIES[0];
