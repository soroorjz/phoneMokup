import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import TrainingInranChart from "../../Components/ChartTrainingComp/TrainingInranChart";

const toPersianNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/\d/g, (x) => persianDigits[x]);
};

export const DataReadingchartData = [
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
  {
    title: "نمودار نقشه‌ای (Map Chart)",
    chart: (
      <TrainingInranChart
        data={[
          { id: "IR-01", name: "آذربايجان شرقي", value: 3900000 },
          { id: "IR-02", name: "آذربايجان غربي", value: 3300000 },
          { id: "IR-03", name: "اردبيل", value: 1300000 },
          { id: "IR-04", name: "اصفهان", value: 5500000 },
          { id: "IR-32", name: "البرز", value: 3000000 },
          { id: "IR-05", name: "ايلام", value: 600000 },
          { id: "IR-06", name: "بوشهر", value: 1200000 },
          { id: "IR-07", name: "تهران", value: 9500000 },
          { id: "IR-08", name: "چهارمحال و بختياري", value: 950000 },
          { id: "IR-29", name: "خراسان جنوبي", value: 800000 },
          { id: "IR-30", name: "خراسان رضوي", value: 6200000 },
          { id: "IR-31", name: "خراسان شمالي", value: 900000 },
          { id: "IR-10", name: "خوزستان", value: 4600000 },
          { id: "IR-11", name: "زنجان", value: 1100000 },
          { id: "IR-12", name: "سمنان", value: 700000 },
          { id: "IR-13", name: "سيستان و بلوچستان", value: 3000000 },
          { id: "IR-14", name: "فارس", value: 5000000 },
          { id: "IR-28", name: "قزوين", value: 1300000 },
          { id: "IR-26", name: "قم", value: 1400000 },
          { id: "IR-16", name: "كردستان", value: 1600000 },
          { id: "IR-15", name: "كرمان", value: 2000000 },
          { id: "IR-17", name: "كرمانشاه", value: 2000000 },
          { id: "IR-18", name: "كهكيلويه و بويراحمد", value: 700000 },
          { id: "IR-27", name: "گلستان", value: 1900000 },
          { id: "IR-19", name: "گيلان", value: 2500000 },
          { id: "IR-20", name: "لرستان", value: 1800000 },
          { id: "IR-21", name: "مازندران", value: 3300000 },
          { id: "IR-22", name: "مركزي", value: 1500000 },
          { id: "IR-23", name: "هرمزگان", value: 1900000 },
          { id: "IR-24", name: "همدان", value: 1800000 },
          { id: "IR-25", name: "يزد", value: 1200000 },
        ]}
      />
    ),
    description:
      "این نمودار موقعیت جغرافیایی استان‌های ایران را نشان می‌دهد و می‌تواند برای تحلیل داده‌های منطقه‌ای به کار رود.",
  },
];
