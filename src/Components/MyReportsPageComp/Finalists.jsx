import React, { Suspense } from "react";

const Finalists = ({ IranMapChart, reports, selectedReport }) => {

  const totalApplicants = 406000;
  const totalAccepted = 19179;
  const topProvince = { name: "تهران", value: 2200 };
  const lowestProvince = { name: "ایلام", value: 200 };

  return (
    <div className="report-details">
      {/* نمایش نقشه ایران با داده‌های مربوط به قبولی‌ها */}
      <Suspense fallback={<div>در حال بارگذاری نقشه...</div>}>
        <IranMapChart />
      </Suspense>

      {/* نمایش اطلاعات آماری در باکس‌های زیر نمودار */}
      <div className="report-stats">
        <div className="stat-box">
          <p className="startTitle">کل ثبت‌نامی‌ها:</p>
          <p><span>{totalApplicants.toLocaleString("fa-IR")}</span> نفر</p>
        </div>
        <div className="stat-box">
          <p className="startTitle">کل پذیرفته‌شدگان:</p>
          <p><span>{totalAccepted.toLocaleString("fa-IR")}</span> نفر</p>
        </div>
        <div className="stat-box">
          <p className="startTitle">بیشترین پذیرفته‌شدگان در استان:</p>
          <p><span>{topProvince.name}</span> با <span>{topProvince.value.toLocaleString("fa-IR")}</span> نفر</p>
        </div>
        <div className="stat-box">
          <p className="startTitle">کمترین پذیرفته‌شدگان در استان:</p>
          <p><span>{lowestProvince.name}</span> با <span>{lowestProvince.value.toLocaleString("fa-IR")}</span> نفر</p>
        </div>
      </div>
    </div>
  );
};
export default Finalists;
