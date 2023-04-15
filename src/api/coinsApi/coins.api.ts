import {
  TCoin,
  TFetchCoinsRequest,
} from "../../features/main/tableData/TableData.types";
import axios from "../index";

export const coinsApi = {
  getCoins: ({ rowsPerPage, page, order, sort }: TFetchCoinsRequest) =>
    axios.get<TCoin[]>(
      `coins/markets?vs_currency=usd&${
        order || (sort && `order=${order}_${sort}`)
      }&per_page=${rowsPerPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
    ),
};
