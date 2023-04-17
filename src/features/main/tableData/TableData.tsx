import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import classes from "./TableData.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import "../../../assets/scss/overrides.scss";
import clsx from "clsx";
import Table from "./table/Table";
import { coinsActions, fetchCoins, fetchGlobal } from "./table/Table.slice";
import { useBoundActions } from "../../../app/store";
import { useAppSelector } from "../../../app/hooks";
import { useSnackbar } from "notistack";
import { TCoinCell, TOption } from "./TableData.types";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const allActions = {
  fetchCoins,
  fetchGlobal,
  ...coinsActions,
};
const coinsCells: TCoinCell[] = [
  { name: "#", value: "market_cap_rank", sortable: false },
  { name: "name", value: "id", sortable: true },
  { name: "price", value: "current_price", sortable: false },
  {
    name: "7d",
    value: "price_change_percentage_7d_in_currency",
    sortable: false,
  },
  {
    name: "24h",
    value: "price_change_percentage_24h_in_currency",
    sortable: false,
  },
  {
    name: "1h",
    value: "price_change_percentage_1h_in_currency",
    sortable: false,
  },
  { name: "market cap", value: "market_cap", sortable: true },
  { name: "24 volume", value: "volume", sortable: true },
  { name: "7d chart", value: "график", sortable: false },
];

const rowsPerPageOptions: TOption[] = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
];

const TableData = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const coins = useAppSelector((state) => state.coinsReducer.coins);
  const message = useAppSelector((state) => state.coinsReducer.message);
  const status = useAppSelector((state) => state.coinsReducer.status);

  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState("5");
  const pages = 1000;
  const handleChange = (event: SelectChangeEvent) => {
    setRowsPerPage(event.target.value);
  };

  const handleSort = (
    sort: string | null,
    isSortable: boolean,
    value: string
  ) => {
    const isCurrentSorted = order === value;
    console.log(sort);

    if (!isCurrentSorted) {
      setOrder(value);
      setSort("asc");
      return;
    }
    if (sort === "desc") {
      setOrder(null);
      setSort(null);
      return;
    }
    setSort("desc");
  };

  const arrayForSort = [...coins];
  useEffect(() => {
    boundActions.fetchGlobal();
    const scroll = window.scrollY;
    boundActions
      .fetchCoins({ rowsPerPage, page: selectedPage, sort, order })
      .unwrap()
      .then(() => window.scrollTo({ left: 0, top: scroll }));
  }, [rowsPerPage, selectedPage, sort, order]);
  useEffect(() => {
    message &&
      enqueueSnackbar(message, {
        variant: status !== "failed" ? "info" : "error",
      });
  }, [message]);

  return (
    <div className={classes.container}>
      <div className={classes["top-panel"]}>
        <h1>
          Collecting data on <p>6364</p> coins and <p>436</p> exchanges
        </h1>
        <div className={clsx("button", classes.buttons)}>
          <Button variant="contained">Need help?</Button>
          <Button variant="contained">
            <SvgSelector id="filters" />
            Filters
          </Button>
        </div>
      </div>
      <div className={classes.table}>
        {status === "idle" && (
          <table>
            <thead>
              <tr>
                {coinsCells.map((cell) => (
                  <th key={cell.name}>
                    <div
                      className={clsx(classes.title, {
                        [classes.asc]: order === cell.name && sort === "asc",
                        [classes.desc]: order === cell.name && sort === "desc",
                        [classes.column]: cell.sortable,
                      })}
                    >
                      <p>{cell.name}</p>
                      <div
                        className="icon-button"
                        onClick={() =>
                          handleSort(sort, cell.sortable, cell.value)
                        }
                      >
                        {cell.sortable && (
                          <IconButton onClick={() => handleSort}>
                            <SvgSelector id="arrow_sort" />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {arrayForSort.map((coin) => (
                <Table key={coin.id} data={coin} />
              ))}
            </tbody>
          </table>
        )}

        {status === "failed" && (
          <div className={classes["empty_message"]}>No data</div>
        )}
      </div>
      <div className={classes["bottom-panel"]}>
        <div>
          <p>Rows per page</p>
          <div className="select">
            <FormControl fullWidth>
              <InputLabel>Rows</InputLabel>
              <Select value={rowsPerPage} label="Rows" onChange={handleChange}>
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <p>
            {selectedPage}/{pages}
          </p>
        </div>
        <div>
          <div
            className={clsx("icon-button", classes["icon-button"])}
            onClick={() => setSelectedPage(1)}
          >
            <IconButton disabled={selectedPage === 1 && true}>
              <SvgSelector
                id="first_page"
                className={clsx({ [classes.disabled]: selectedPage === 1 })}
              />
            </IconButton>
          </div>
          <div
            className={clsx("icon-button", classes["icon-button"])}
            onClick={() =>
              selectedPage > 1 && setSelectedPage(selectedPage - 1)
            }
          >
            <IconButton disabled={selectedPage === 1 && true}>
              <SvgSelector
                id="arrow_left"
                className={clsx({ [classes.disabled]: selectedPage === 1 })}
              />
            </IconButton>
          </div>
          <div
            className={clsx("icon-button", classes["icon-button"])}
            onClick={() =>
              selectedPage < pages && setSelectedPage(selectedPage + 1)
            }
          >
            <IconButton disabled={selectedPage === pages && true}>
              <SvgSelector
                id="arrow_right"
                className={clsx({
                  [classes.disabled]: selectedPage === pages,
                })}
              />
            </IconButton>
          </div>
          <div
            className={clsx("icon-button", classes["icon-button"])}
            onClick={() => setSelectedPage(pages)}
          >
            <IconButton disabled={selectedPage === pages && true}>
              <SvgSelector
                id="last_page"
                className={clsx({
                  [classes.disabled]: selectedPage === pages,
                })}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableData;
