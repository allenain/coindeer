import classes from "../Navigation.module.scss";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import React, { useEffect, useRef } from "react";

interface INavlinkProps {
  id: string;
  name: string;
}

const Navlink: React.FC<INavlinkProps> = ({ id, name }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOnMouseMove = (event: any) => {
    const target = ref.current;
    if (!target) return;
    const rect = target.getBoundingClientRect(),
      x = event.clientX - rect.left,
      y = event.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleOnMouseMove);
  }, []);
  return (
    <div className={classes.navlink} ref={ref}>
      <div className={classes["navlink-border"]} />
      <div className={classes["navlink-content"]}>
        <SvgSelector id={id} className={id === "star" ? classes.star : ""} />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Navlink;
