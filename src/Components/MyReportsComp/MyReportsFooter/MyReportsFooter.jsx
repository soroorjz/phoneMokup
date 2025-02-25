import React from "react";
import "./MyReportsFooter.scss";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
const MyReportsFooter = () => {
  return (
    <div className="MyReportsFooter-Container">
      <p className="date">
        <span>تاریخ ایجاد: </span>
        ۱۴۰۳/۵/۲
      </p>
      <div className="MyReportsBtns">
        <button className="delete">
          حذف <MdDeleteOutline />
        </button>
        <button className="edit">
          ویرایش
          <MdOutlineEdit />
        </button>
      </div>
    </div>
  );
};

export default MyReportsFooter;
