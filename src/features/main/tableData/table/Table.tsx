import React, { useState } from "react";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import classes from "./Table.module.scss";
import { mathRound, transformMoney } from "../../../../utils/utils";
import { TCoin } from "../TableData.types";
import Chart from "../../../../components/chart/Chart";

interface ITableProps {
  data: TCoin;
}

const Table: React.FC<ITableProps> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleSelectFavorite = () => {
    !isFavorite ? setIsFavorite(true) : setIsFavorite(false);
  };

  return (
    <>
      <tr>
        <td>{data.market_cap_rank}</td>
        <td>
          <img src={data.image} alt="" /> <h2>{data.name}</h2>{" "}
          <p>{data.symbol}</p>
        </td>
        <td>{transformMoney(data.current_price, "$", false)}</td>
        <td
          onClick={() =>
            console.log(data.price_change_percentage_7d_in_currency)
          }
          className={clsx(classes.positive, {
            [classes.negative]: data.price_change_percentage_7d_in_currency < 0,
          })}
        >
          {mathRound(data.price_change_percentage_7d_in_currency)}%
        </td>
        <td
          className={clsx(classes.positive, {
            [classes.negative]:
              data.price_change_percentage_24h_in_currency < 0,
          })}
        >
          {mathRound(data.price_change_percentage_24h_in_currency)}%
        </td>
        <td
          className={clsx(classes.positive, {
            [classes.negative]: data.price_change_percentage_1h_in_currency < 0,
          })}
        >
          {mathRound(data.price_change_percentage_1h_in_currency)}%
        </td>

        <td>{transformMoney(data.market_cap, "$", false)}</td>
        <td>{transformMoney(data.total_volume, "$", false)}</td>
        <td>
          <Chart price={data.sparkline_in_7d.price} />
        </td>
        <div onClick={handleSelectFavorite}>
          <SvgSelector
            id="star"
            className={clsx(classes.star, { [classes.favorite]: isFavorite })}
          />
        </div>
      </tr>
    </>
  );
};

export default Table;
