// import React, { useState, lazy, Suspense } from "react";
// import { reports } from "./myReportsData";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import "./MyReportsPageComp.scss";
// import { useReports } from "../../pages/ExamAnalysis/ReportsContext";

// // بارگذاری داینامیک کامپوننت‌های مخصوص هر گزارش
// const QualityAssurance = lazy(() =>
//   import("./QualityAssurance/QualityAssurance")
// );
// const GenderRatio = lazy(() => import("./GenderRatio/GenderRatio"));
// const Finalists = lazy(() => import("./Finalists"));
// const IranMapChart = lazy(() => import("./IranMapChart"));

// const MyReportsPageComp = () => {
//   const [selectedReport, setSelectedReport] = useState("all");
//   const wasAllSelected = selectedReport === "all";
//   const { reports } = useReports();

//   const handleSelectChange = (e) => {
//     setSelectedReport(
//       e.target.value === "all" ? "all" : Number(e.target.value)
//     );
//   };

//   const handleReportClick = (index) => {
//     setSelectedReport(index);
//   };

//   return (
//     <div className="report-container">
//       <div className="myReportHeader">
//         <label>گزارش موردنظر خود را انتخاب کنید:</label>
//         <select onChange={handleSelectChange} value={selectedReport}>
//           <option value="all">همه</option>
//           {reports.map((report, index) => (
//             <option key={index} value={index}>
//               {report.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="report-content">
//         {selectedReport === "all" ? (
//           <ul>
//             {reports.map((report, index) => (
//               <li key={index}>
//                 <button
//                   className="reports-options"
//                   onClick={() => handleReportClick(index)}
//                 >
//                   {report.title} ({report.date})
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <>
//             {!wasAllSelected && (
//               <button
//                 className="backToAllReports"
//                 onClick={() => setSelectedReport("all")}
//               >
//                 <IoMdArrowRoundBack />
//               </button>
//             )}
//             <h3>
//               {reports[selectedReport].title} ({reports[selectedReport].date})
//             </h3>

//             {/* نمایش کامپوننت مخصوص هر گزارش */}
//             <Suspense fallback={<p>در حال بارگذاری...</p>}>
//               {selectedReport === 0 && <QualityAssurance />}
//               {selectedReport === 1 && <GenderRatio />}
//               {selectedReport === 2 && (
//                 <Finalists
//                   IranMapChart={IranMapChart}
//                   reports={reports}
//                   selectedReport={selectedReport}
//                 />
//               )}
//             </Suspense>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyReportsPageComp;

import React, { useState, Suspense } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./MyReportsPageComp.scss";
import { useReports } from "../../pages/ExamAnalysis/ReportsContext";
import ChartComponent from "../ExamAnalysisComp/ExamAnalysisChart";

const ReportDetails = ({ report }) => {
  return (
    <div className="report-details">
      <h3>{report.title}</h3>
      <div className="chart-wrapper">
        <ChartComponent chartType={report.chartType} filters={report.filters} />
      </div>
      <div className="description-boxes">
        {report.descriptionBoxes.length > 0 ? (
          report.descriptionBoxes.map((box) => (
            <div key={box.id} className="description-box">
              <p>{box.text}</p>
            </div>
          ))
        ) : (
          <p>توضیحاتی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

const MyReportsPageComp = () => {
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = useState("all");

  const handleSelectChange = (e) => {
    setSelectedReport(
      e.target.value === "all" ? "all" : Number(e.target.value)
    );
  };

  const handleReportClick = (index) => {
    setSelectedReport(index);
  };

  return (
    <div className="report-container">
      <div className="myReportHeader">
        <label>گزارش موردنظر خود را انتخاب کنید:</label>
        <select onChange={handleSelectChange} value={selectedReport}>
          <option value="all">همه</option>
          {reports.map((report, index) => (
            <option key={report.id} value={index}>
              {report.title}
            </option>
          ))}
        </select>
      </div>

      <div className="report-content">
        {selectedReport === "all" ? (
          <ul>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <li key={report.id}>
                  <button
                    className="reports-options"
                    onClick={() => handleReportClick(index)}
                  >
                    {report.title} ({report.date})
                  </button>
                </li>
              ))
            ) : (
              <p>هنوز گزارشی ثبت نشده است.</p>
            )}
          </ul>
        ) : (
          <>
            <button
              className="backToAllReports"
              onClick={() => setSelectedReport("all")}
            >
              <IoMdArrowRoundBack />
            </button>
            <Suspense fallback={<p>در حال بارگذاری...</p>}>
              <ReportDetails report={reports[selectedReport]} />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReportsPageComp;
