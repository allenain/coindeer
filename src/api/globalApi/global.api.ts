import axios from "../index";
import { TGlobal } from "../../features/main/tableData/TableData.types";

export const globalApi = {
  getGlobal: () => axios.get<TGlobal>("global"),
};
