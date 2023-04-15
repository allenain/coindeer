import SvgSelector from "../../../components/svgSelector/SvgSelector";
import React from "react";
import classes from "./Navigation.module.scss";
import Navlink from "./navlink/Navlink";

const Navigation = () => {
  return (
    <div className={classes.container}>
      <Navlink id="home" name="Explorer" />
      <Navlink id="star" name="Watchlist" />
      <Navlink id="graphic" name="Trending/New" />
      <Navlink id="portfolio" name="Portfolio" />
      <Navlink id="categories" name="Categories" />
    </div>
  );
};

export default Navigation;
