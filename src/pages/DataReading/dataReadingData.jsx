import { Bar, Line, Pie, Scatter } from "react-chartjs-2";

const toPersianNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/\d/g, (x) => persianDigits[x]);
};

export const chartData = [
  {
    title: "نمودار ستونی (Bar Chart)",
    chart: (
      <Bar
        data={{
          labels: ["داوطلب ۱", "داوطلب ۲", "داوطلب ۳", "داوطلب ۴"],
          datasets: [
            {
              label: "نمرات آزمون",
              data: [85, 90, 78, 92],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "مقایسه نمرات داوطلبان",
              font: {
                family: "Vazirmatn",
                size: 16,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${toPersianNumber(value)}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
              },
            },
            y: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
                callback: (value) => toPersianNumber(value),
              },
            },
          },
        }}
      />
    ),
    description:
      "نمودار ستونی برای مقایسه‌ی مقادیر بین گروه‌های مختلف استفاده می‌شود. محور عمودی (Y) مقدار و محور افقی (X) گروه‌ها را نشان می‌دهد.",
  },
  {
    title: "نمودار خطی (Line Chart)",
    chart: (
      <Line
        data={{
          labels: ["هفته ۱", "هفته ۲", "هفته ۳", "هفته ۴"],
          datasets: [
            {
              label: "روند نمرات",
              data: [70, 80, 85, 90],
              borderColor: "rgba(153, 102, 255, 0.6)",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "روند بهبود نمرات در طول زمان",
              font: {
                family: "Vazirmatn",
                size: 16,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${toPersianNumber(value)}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
              },
            },
            y: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
                callback: (value) => toPersianNumber(value),
              },
            },
          },
        }}
      />
    ),
    description:
      "نمودار خطی برای نمایش روند تغییرات در طول زمان استفاده می‌شود. محور X زمان و محور Y مقدار را نشان می‌دهد.",
  },
  {
    title: "نمودار دایره‌ای (Pie Chart)",
    chart: (
      <Pie
        data={{
          labels: ["داوطلبان مرد", "داوطلبان زن"],
          datasets: [
            {
              label: "تعداد داوطلبان",
              data: [60, 40],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "توزیع جنسیتی داوطلبان",
              font: {
                family: "Vazirmatn",
                size: 16,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${toPersianNumber(value)}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
              },
            },
            y: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
                callback: (value) => toPersianNumber(value),
              },
            },
          },
        }}
      />
    ),
    description:
      "نمودار دایره‌ای برای نمایش سهم هر بخش از کل استفاده می‌شود. هر بخش نشان‌دهنده‌ی درصد یا سهمی از کل است.",
  },
  {
    title: "نمودار پراکندگی (Scatter Plot)",
    chart: (
      <Scatter
        data={{
          datasets: [
            {
              label: "رابطه سن و نمره",
              data: [
                { x: 25, y: 80 },
                { x: 30, y: 85 },
                { x: 35, y: 90 },
                { x: 40, y: 78 },
              ],
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "رابطه سن و نمره داوطلبان",
              font: {
                family: "Vazirmatn",
                size: 16,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
                callback: (value) => toPersianNumber(value),
              },
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "سن",
              },
            },
            y: {
              ticks: {
                font: {
                  family: "Vazirmatn",
                },
                callback: (value) => toPersianNumber(value),
              },
              title: {
                display: true,
                text: "نمره",
              },
            },
          },
        }}
      />
    ),
    description:
      "نمودار پراکندگی برای بررسی رابطه‌ی بین دو متغیر استفاده می‌شود. هر نقطه نشان‌دهنده‌ی یک داده است.",
  },
];
