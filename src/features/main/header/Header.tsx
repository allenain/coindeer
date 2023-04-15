import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { IconButton } from "@mui/material";
import { useThemeDetector } from "../../../hooks";
import clsx from "clsx";

const Header = () => {
  const localStorageTheme = window.localStorage.getItem("theme");
  const systemTheme = useThemeDetector() ? "dark" : "light";
  const [theme, setTheme] = useState(
    localStorageTheme === null ? systemTheme : localStorageTheme
  );
  const [isDarkThemeButton, setIsDarkThemeButton] = useState(theme === "dark");
  const [animation, setAnimation] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setIsDarkThemeButton(!isDarkThemeButton);
    setAnimation(true);
    const animationTimeout = setTimeout(() => {
      setAnimation(false);
      setTheme(newTheme);
    }, 800);
    const themeTimeout = setTimeout(() => {
      document.documentElement.setAttribute("color-scheme", newTheme);
      window.localStorage.setItem("theme", newTheme);
    }, 400);
    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(themeTimeout);
    };
  };

  useEffect(() => {
    setTheme(theme);
    document.documentElement.setAttribute("color-scheme", theme);
    window.localStorage.setItem("theme", theme);
  }, []);
  return (
    <>
      <div
        className={clsx(
          isDarkThemeButton
            ? classes["container-dark"]
            : classes["container-light"]
        )}
      >
        <header>
          <div className={classes.logo}>
            <SvgSelector id="logo" />
            <p>CoinDeer</p>
          </div>
          <div className={classes.navigation}>
            <IconButton
              classes={{
                sizeLarge: clsx(classes["icon-button"], {
                  [classes.animation]: animation,
                  [classes.dark]: isDarkThemeButton,
                }),
              }}
              size="large"
              onClick={handleToggleTheme}
            >
              <SvgSelector
                id={isDarkThemeButton ? "light_mode" : "dark_mode"}
              />
            </IconButton>
            <IconButton size="large">
              <SvgSelector id="notification" />
            </IconButton>
            <IconButton size="large">
              <SvgSelector id="profile" />
            </IconButton>
            <IconButton size="large">
              <SvgSelector id="settings" />
            </IconButton>
          </div>
        </header>
        <div className={classes["center-container"]}>
          <h1>Explore Cryptocurrencies</h1>
          <div className={classes["market-data"]}>
            <h2>
              Total market cap: <p> $1,507,455,642,738</p>
            </h2>
            <h2>
              24h Vol: <p> $108,455,642,738</p>
            </h2>
          </div>
          <div className={classes.search}>
            <SvgSelector id="search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
