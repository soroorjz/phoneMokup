import React from "react";
import "./DetailBoxs.scss";
const DetailBoxs = () => {
  return (
    <div className="DetailBoxsContainer">
      <div className="Participants">
        <h3>تعداد شرکت‌کنندگان در آخرین آزمون</h3>
        <p>۵۱۲نفر</p>
      </div>
      <div className="Accepted">
        <h3>تعداد پذیرفته‌شدگان در آخرین آزمون</h3>
        <p>۱۲۵نفر</p>
        
      </div>
    </div>
  );
};

export default DetailBoxs;
