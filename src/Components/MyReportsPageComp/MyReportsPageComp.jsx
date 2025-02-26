import React, { useState, lazy, Suspense } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./MyReportsPageComp.scss";

// بارگذاری کامپوننت نقشه ایران از amCharts به‌صورت داینامیک
const IranMapChart = lazy(() => import("./IranMapChart"));
const reports = [
  {
    title: "آزمون استخدامی مشاغل کیفیت‌بخشی وزارت آموزش و پرورش",
    date: "۱۴۰۳/۱۱/۲۸",
    stats: null, // داده‌ای برای این گزارش وجود ندارد
  },
  {
    title: "ثبت‌نام متقاضیان در آزمون استخدامی اجتماعی مکلفان به پذیرش رایگان",
    date: "۱۴۰۳/۱۰/۲۲",
    stats: null,
  },
  {
    title: "پذیرفته‌شدگان نهایی آزمون در استان‌های ایران",
    date: "۱۴۰۳/۰۹/۰۳",
    stats: {
      totalApplicants: 50000,
      totalAccepted: 12000,
      topProvince: "تهران",
      lowestProvince: "سیستان و بلوچستان",
    },
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
            <h3>
              {reports[selectedReport].title} ({reports[selectedReport].date})
            </h3>

            {/* اگر گزارش مربوطه دارای داده‌های آماری باشد، نمودار و باکس‌های اطلاعاتی نمایش داده شوند */}
            {reports[selectedReport].stats ? (
              <div className="report-details">
                {/* نمایش نقشه ایران با داده‌های مربوط به قبولی‌ها */}
                <Suspense fallback={<div>در حال بارگذاری نقشه...</div>}>
                  <IranMapChart data={reports[selectedReport].stats} />
                </Suspense>

                {/* نمایش اطلاعات آماری در باکس‌های زیر نمودار */}
                <div className="report-stats">
                  <div className="stat-box">
                    <p className="startTitle">کل ثبت‌نامی‌ها: </p>

                    <p>{reports[selectedReport].stats.totalApplicants}</p>
                  </div>
                  <div className="stat-box">
                    <p className="startTitle">کل پذیرفته‌شدگان: </p>

                    <p>{reports[selectedReport].stats.totalAccepted}</p>
                  </div>
                  <div className="stat-box">
                    <p className="startTitle">
                      بیشترین پذیرفته‌شدگان در استان:{" "}
                    </p>

                    <p>{reports[selectedReport].stats.topProvince}</p>
                  </div>
                  <div className="stat-box">
                    <p className="startTitle">
                      کمترین پذیرفته‌شدگان در استان:{" "}
                    </p>

                    <p>{reports[selectedReport].stats.lowestProvince}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>برای این گزارش، داده‌ای موجود نیست.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyReportsPageComp;
