import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    apikey: import.meta.env.VITE_API_KEY,
  },
});

export const currencyList = async () => {
  return instance
    .get("currencies")
    .then((res) => res.data.data)
    .catch(console.error);
};
export const converter = async (base_currency, currencies) => {
  return instance
    .get("latest", {
      params: {
        base_currency,
        currencies,
      },
    })
    .then((res) => res.data.data)
    .catch(console.error);
};
