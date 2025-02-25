export const reportSlides = [
  {
    title: "تحلیل جنسیت شرکت‌کنندگان",
    type: "pie",
    data: {
      labels: ["مرد", "زن"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // بهبود مقیاس‌بندی نمودار
      plugins: {
        legend: {
          position: "right", // لیبل‌ها به راست منتقل می‌شوند
          labels: {
            boxWidth: 20, // اندازه مربع‌های رنگی
            padding:15, // فاصله‌ی بین لیبل‌ها
            font: { size: 14, family: "Tahoma" }, // اندازه‌ی فونت منطقی‌تر
            color: "#333",
          },
        },
      },
    },
  },
  {
    title: "تحلیل سهمیه شرکت‌کنندگان",
    type: "pie",
    data: {
      labels: ["5% سهمیه", "25% سهمیه", "سهمیه آزاد", "50% سهمیه"],
      datasets: [
        {
          data: [5, 25, 50, 20],
          backgroundColor: ["#C57D42", "#64847C", "#181B35", "#636BB9"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          align: "center",
          labels: {
            boxWidth: 15,
            padding: 15,
            font: { size: 14, family: "Vazirmatn" },
            color: "#333",
          },
        },
      },
    },
  },
  {
    title: "رشته‌های پرمتقاضی در آزمون",
    type: "bar",
    data: {
      labels: ["مهندسی کامپیوتر", "مدیریت", "حسابداری", "حقوق", "مهندسی برق"],
      datasets: [
        {
          label: "تعداد شرکت‌کنندگان",
          data: [200, 150, 130, 120, 100],
          backgroundColor: [
            "#FFCE56",
            "#4CAF50",
            "#36A2EB",
            "#FF6384",
            "#C57D42",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // حذف لیبل از بالا برای نمودار میله‌ای
        },
      },
      scales: {
        x: {
          ticks: {
            font: { size: 12, family: "Vazirmatn" },
            color: "#333",
          },
        },
        y: {
          ticks: {
            font: { size: 12, family: "Vazirmatn" },
            color: "#333",
          },
        },
      },
    },
  },
];
export const examStats = [
  { label: "تعداد کل شرکت‌کنندگان", value: "۱۲۵۰ نفر" },
  { label: "تعداد شرکت‌کنندگان مرد", value: "۷۵۰ نفر" },
  { label: "تعداد شرکت‌کنندگان زن", value: "۵۰۰ نفر" },
  { label: "تعداد پذیرفته‌شدگان", value: "۹۵۹ نفر" },
  { label: "پذیرفته‌شدگان ۵٪ سهمیه", value: "۱۷ نفر" },
  { label: "پذیرفته‌شدگان ۲۵٪ سهمیه", value: "۲۵۲ نفر" },
  { label: "پذیرفته‌شدگان ۵۰٪ سهمیه", value: "۴۲۷ نفر" },
  { label: "پذیرفته‌شدگان آزاد", value: "۱۰۱۷ نفر" },
  { label: "استان با بیشترین شرکت‌کننده", value: "تهران (۲۵۰ نفر)" },
  {
    label: "استان با کمترین شرکت‌کننده",
    value: "کهگیلویه و بویراحمد (۱۵ نفر)",
  },
];
