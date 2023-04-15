import Header from "./header/Header";
import React from "react";
import Navigation from "./navigation/Navigation";
import TableData from "./tableData/TableData";

const Main = () => {
  return (
    <div className="container">
      <Header />
      <Navigation />
      <TableData />
    </div>
  );
};

export default Main;
