import React from "react";
import PieChart from "../../ReportMain/PieChart/PieChart";

const MyReportPage = () => {
  return (
    <div>
      <h3>مقایسه تعداد ظرفیت آزمون استخدامی برای خانم‌ها و آقایان</h3>
      <div className="pieChartPart">
        <PieChart />
      </div>
      
    </div>
  );
};

export default MyReportPage;
