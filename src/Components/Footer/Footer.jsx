import React from "react";
import "./Footer.scss";
import { MdOutlineMessage } from "react-icons/md";
const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerTop">
        <button>مشاهده روند رسیدگی به اعتراضات در استان</button>
        <button>مشاهده روند ثبت نام در آزمون جاری استان</button>
      </div>
      <div className="footerBottom">
        <button className="exit">خروج</button>
       
      </div>
    </div>
  );
};

export default Footer;
