export type TCoin = {
  market_cap_rank: number;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: number[] };
};
export type TCoinCell = {
  name: string;
  value: string;
  sortable: boolean;
};
export type TOption = {
  value: string | number;
  label: string;
};
export type TFetchCoinsRequest = {
  rowsPerPage: any;
  page: number;
  order: string | null;
  sort: "asc" | "desc" | null;
};

export type TGlobal = {
  data: {
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
  };
};
