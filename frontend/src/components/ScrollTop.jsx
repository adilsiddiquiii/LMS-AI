import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } , [pathName]);
};
export default ScrollTop;
