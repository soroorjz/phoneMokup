import React from "react";
import "./ReportForm.scss";
import MenuComp from "../../Components/MenuComp/MenuComp";
import DetailBoxs from "../../Components/DetailBoxs/DetailBoxs";
import MyChart from "../../Components/MyChart/MyChart";
import SelectableList from "../../Components/SelectableList/SelectableList";
import Footer from "../../Components/Footer/Footer";
import BottomTabChart from "../../Components/BottomTabChart/BottomTabChart";
const ReportForm = () => {
  // return (
  //   <div className="report-form">
  //     {/* Header Section */}
  //     <header className="form-header">
  //       <div className="logo-placeholder">لوگو</div>
  //       <h1>گزارش کار</h1>
  //     </header>

  //     {/* Categories Section */}
  //     <div className="categories">
  //       <div className="category">گزارش مالی</div>
  //       <div className="category">گزارش حوزه اجتماعی</div>
  //       <div className="category">گزارش ساز</div>
  //     </div>

  //     {/* Instructions Section */}
  //     <p className="instructions">
  //       در فرم زیر موارد گزارش را طبق درخواست تکمیل نمایید.
  //     </p>

  //     {/* Table Section */}
  //     <table className="report-table">
  //       <thead>
  //         <tr>
  //           <th>انتخاب ستون</th>
  //           <th>ردیف</th>
  //           <th>شرح</th>
  //           <th>عدد</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((row, index) => (
  //           <tr key={index}>
  //             <td>
  //               <input type="checkbox" name={`row-${index}`} />
  //             </td>
  //             <td>{index + 1}</td>
  //             <td>{row.description}</td>
  //             <td>{row.value || "***"}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     {/* Footer Section */}
  //     <footer className="form-footer">
  //       <p>ارسال توسط مدیر: نام مدیر</p>
  //     </footer>
  //   </div>
  // );
  return (
    <>
      <MenuComp />
      <DetailBoxs />
      <MyChart />
      <SelectableList />
      <Footer />
      <BottomTabChart />
    </>
  );
};

export default ReportForm;

// Usage example
// import ReportForm from "./ReportForm";
// const data = [
//   { description: "تعداد درخواست‌ها", value: 120 },
//   { description: "تعداد کاربران فعال", value: 50 },
//   { description: "تعداد کل بازدیدکنندگان", value: 300 },
// ];
// <ReportForm data={data} />;
