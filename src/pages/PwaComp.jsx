import React from "react";
import "./PwaComp.scss";
const PwaComp = () => {
  return (
    <div id="install-popup">
      <p>برای نصب برنامه، روی دکمه نصب کلیک کنید</p>
      <button id="install-button">نصب</button>
      <button id="cancel-button">لغو</button>
    </div>
  );
};

export default PwaComp;
