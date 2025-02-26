import React, { Suspense } from "react";

const Finalists = ({ IranMapChart, reports, selectedReport }) => {
  return (
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
          <p className="startTitle">بیشترین پذیرفته‌شدگان در استان: </p>

          <p>{reports[selectedReport].stats.topProvince}</p>
        </div>
        <div className="stat-box">
          <p className="startTitle">کمترین پذیرفته‌شدگان در استان: </p>

          <p>{reports[selectedReport].stats.lowestProvince}</p>
        </div>
      </div>
    </div>
  );
};

export default Finalists;
