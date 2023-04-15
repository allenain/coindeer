import React from "react";
import classes from "./Chart.module.scss";
import { generateChart } from "./chart.utils";
import clsx from "clsx";

type TChartProps = {
  price: number[];
};

const Chart: React.FC<TChartProps> = ({ price }) => {
  return (
    <>
      {price.length ? (
        <svg
          preserveAspectRatio="none"
          viewBox="-1 0 169 56"
          className={clsx(classes.sparkline, {
            [classes.green]: price[0] <= price[price.length - 1],
            [classes.red]: price[0] > price[price.length - 1],
          })}
        >
          <polyline fill="none" strokeWidth="2" points={generateChart(price)} />
        </svg>
      ) : (
        <div>-</div>
      )}
    </>
  );
};

export default Chart;
