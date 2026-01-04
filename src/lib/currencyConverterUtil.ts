import type { Currency } from "@/types/Currency";

const URL = "https://v6.exchangerate-api.com/v6/cd3179ca72285ce11b9d0334";

export async function convertCurrency(
  amount: number,
  curr1: Currency,
  curr2: Currency
): Promise<number> {
  if (curr1.iso === curr2.iso) return amount;

  const res = await fetch(`${URL}/pair/${curr1.iso}/${curr2.iso}/${amount}`);

  const data = await res.json();
  return data.conversion_result;
}
