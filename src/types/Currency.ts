// In Currency.ts
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
  currency: CurrencySymbol;
}

export const CURRENCIES: { symbol: CurrencySymbol; name: string }[] = [
  { symbol: "$", name: "USD - US Dollar" },
  { symbol: "€", name: "EUR - Euro" },
  { symbol: "£", name: "GBP - British Pound" },
  { symbol: "¥", name: "JPY/CNY - Japanese Yen / Chinese Yuan" },
  { symbol: "₹", name: "INR - Indian Rupee" },
  { symbol: "₽", name: "RUB - Russian Ruble" },
  { symbol: "₩", name: "KRW - South Korean Won" },
  { symbol: "₪", name: "ILS - Israeli Shekel" },
  { symbol: "₦", name: "NGN - Nigerian Naira" },
  { symbol: "₨", name: "PKR - Pakistani Rupee" },
  { symbol: "₫", name: "VND - Vietnamese Dong" },
  { symbol: "₱", name: "PHP - Philippine Peso" },
  { symbol: "₴", name: "UAH - Ukrainian Hryvnia" },
  { symbol: "₵", name: "GHS - Ghanaian Cedi" },
  { symbol: "₸", name: "KZT - Kazakhstani Tenge" },
  { symbol: "₺", name: "TRY - Turkish Lira" },
  { symbol: "₼", name: "AZN - Azerbaijani Manat" },
  { symbol: "₾", name: "GEL - Georgian Lari" },
  { symbol: "₿", name: "BTC - Bitcoin" },
];
