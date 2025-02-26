import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./MyReportsPageComp.scss";
const reports = [
  {
    title: "آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش",
    date: "۱۴۰۳/۱۱/۲۸",
  },
  {
    title: "ثبت‌نام متقاضیان در آزمون استخدامی اجتماعی مکلفان به پذیرش رایگان",
    date: "۱۴۰۳/۱۰/۲۲",
  },
  {
    title: "پذیرفته‌شدگان نهایی آزمون در استان‌های ایران",
    date: "۱۴۰۳/۰۹/۰۳",
  },
];

const MyReportsPageComp = () => {
  const [selectedReport, setSelectedReport] = useState("all");
  const [wasAllSelected, setWasAllSelected] = useState(true);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedReport(value);
    setWasAllSelected(value === "all");
  };

  const handleReportClick = (index) => {
    setSelectedReport(index);
    setWasAllSelected(true);
  };

  return (
    <div className="report-container">
      <div className="myReportHeader">
        <label>گزارش موردنظر خود را انتخاب کنید:</label>
        <select onChange={handleSelectChange}>
          <option value="all">همه</option>
          {reports.map((report, index) => (
            <option key={index} value={index}>
              {report.title}
            </option>
          ))}
        </select>
      </div>

      <div className="report-content">
        {selectedReport === "all" ? (
          <ul>
            {reports.map((report, index) => (
              <li key={index}>
                <button
                  className="reports-options"
                  onClick={() => handleReportClick(index)}
                >
                  {report.title} ({report.date})
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {wasAllSelected && (
              <button
                className="backToAllReports"
                onClick={() => setSelectedReport("all")}
              >
                <IoMdArrowRoundBack />
              </button>
            )}
            <ul>
              <li>
                {reports[selectedReport].title} ({reports[selectedReport].date})
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReportsPageComp;
