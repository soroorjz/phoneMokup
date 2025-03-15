import React, { useState, Suspense } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./MyReportsPageComp.scss";
import { useReports } from "../../pages/ExamAnalysis/ReportsContext";
import ChartComponent from "../ExamAnalysisComp/ExamAnalysisChart";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


//fake data just for testing
const staticReports = [
  {
    id: "static-1",
    title:
      "بررسی نسبت قبول‌شدگان زن به مرد در یازدهمین آزمون مشترک دستگاه‌های اجرایی",
    chartType: "pie",
    filters: { exam: "11th_joint_executive" },
    data: {
      labels: ["زنان", "مردان"],
      datasets: [
        {
          label: "تعداد قبول‌شدگان",
          data: [450, 550], // کل: 1000 نفر
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    descriptionBoxes: [
      { id: 1, text: "تعداد کل شرکت‌کنندگان در آزمون: ۲۰۰۰ نفر" },
      {
        id: 2,
        text: "تعداد زنان شرکت‌کننده: ۹۵۰ نفر | تعداد مردان شرکت‌کننده: ۱۰۵۰ نفر",
      },
      {
        id: 3,
        text: "تعداد قبول‌شدگان در آزمون کتبی: زنان ۵۲۲ نفر (۵۵٪) | مردان ۶۳۰ نفر (۶۰٪)",
      },
      {
        id: 4,
        text: "تعداد قبول‌شدگان در ارزیابی تکمیلی: زنان ۴۵۰ نفر (۴۷.۳٪) | مردان ۵۵۰ نفر (۵۲.۴٪)",
      },
    ],
    date: "۱۴۰۳/۱۲/۰۱",
  },
  {
    id: "static-2",
    title: "پراکندگی جمعیت کل مستخدمین با سهمیه ۵٪ کل کشور در سال ۱۴۰۲",
    chartType: "map",
    filters: { type: "employment_distribution" },
    data: [
      { id: "IR-01", name: "آذربایجان شرقی", value: 0 },
      { id: "IR-02", name: "آذربایجان غربی", value: 0 },
      { id: "IR-03", name: "اردبیل", value: 0 },
      { id: "IR-04", name: "اصفهان", value: 50 },
      { id: "IR-32", name: "البرز", value: 2 },
      { id: "IR-05", name: "ایلام", value: 0 },
      { id: "IR-06", name: "بوشهر", value: 0 },
      { id: "IR-07", name: "تهران", value: 45 },
      { id: "IR-08", name: "چهارمحال و بختیاری", value: 0 },
      { id: "IR-29", name: "خراسان جنوبی", value: 0 },
      { id: "IR-30", name: "خراسان رضوی", value: 3 },
      { id: "IR-31", name: "خراسان شمالی", value: 0 },
      { id: "IR-10", name: "خوزستان", value: 40 },
      { id: "IR-11", name: "زنجان", value: 2 },
      { id: "IR-12", name: "سمنان", value: 0 },
      { id: "IR-13", name: "سیستان و بلوچستان", value: 2 },
      { id: "IR-14", name: "فارس", value: 3 },
      { id: "IR-28", name: "قزوین", value: 0 },
      { id: "IR-26", name: "قم", value: 35 },
      { id: "IR-16", name: "کردستان", value: 0 },
      { id: "IR-15", name: "کرمان", value: 2 },
      { id: "IR-17", name: "کرمانشاه", value: 0 },
      { id: "IR-18", name: "کهگیلویه و بویراحمد", value: 0 },
      { id: "IR-27", name: "گلستان", value: 0 },
      { id: "IR-19", name: "گیلان", value: 0 },
      { id: "IR-20", name: "لرستان", value: 0 },
      { id: "IR-21", name: "مازندران", value: 0 },
      { id: "IR-22", name: "مرکزی", value: 0 },
      { id: "IR-23", name: "هرمزگان", value: 1 },
      { id: "IR-24", name: "همدان", value: 0 },
      { id: "IR-25", name: "یزد", value: 1 },
    ],
    descriptionBoxes: [
      { id: 1, text: "تعداد کل شرکت‌کنندگان با سهمیه ۵٪: ۳۹۵ نفر" },
      { id: 2, text: "تعداد کل مستخدمین با سهمیه ۵٪: ۱۸۶ نفر (۴۷٪ قبولی)" },
      {
        id: 3,
        text: "بیشترین درصد قبولی با سهمیه ۵٪: اصفهان ۱۲.۷٪ | خوزستان ۱۰.۱٪ | قم ۸.۹٪",
      },
      {
        id: 4,
        text: "نسبت به قبول‌شدگان با سهمیه ۵٪ به قبول شدگان کل کشور: اصفهان ۲۶.۹٪ | خوزستان ۲۱.۵٪ | قم ۱۸.۸٪",
      },
    ],
    date: "۱۴۰۳/۱۲/۰۵",
  },
  {
    id: "static-3",
    title: "ظرفیت مشاغل درخواستی هر دستگاه در سال ۱۴۰۲",
    chartType: "bar",
    filters: { type: "job_capacity" },
    data: {
      labels: [
        "وزارت نیرو",
        "شرکت مدیریت منابع آب ایران",
        "شرکت تولید نیروی برق حرارتی",
        "شرکت توانیر",
        "سازمان انرژی های تجدیدپذیر و بهره وری انرژی برق(ساتبا)",
        "شرکت مهندسی آب و فاضلاب کشور",
        "شرکت آب منطقه ای آذربایجان غربی",
        "شرکت آب منطقه ای استان خوزستان",
        "شرکت مدیریت تولید نیروی برق دماوند",
        "شرکت مدیریت تولید نیروی برق شهید رجایی",
        "شرکت آریا ترانسفو قدرت",
        "شرکت تولید نیروی برق لوشان",
        "سازمان انرژی های تجدید پذیر و بهره وری انرژی برق",
        "شرکت پیشگامان فن اندیش تهران",
        "نیروگاه سیکل ترکیبی جهرم",
        "شرکت میهن نور کوشا",
        "شرکت کاویان سازه آژند",
        "شرکت توزیع نیروی برق البرز(پیمان صنعت نیوساد)",
        "شرکت توزیع نیروی برق استان سیستان و بلوچستان",
        "شرکت توزیع نیروی برق استان گیلان",
        "شرکت آب و فاضلاب شهر شیراز",
        "شرکت توسعه منابع آب و نیروی ایران",
        "شرکت توزیع نیروی برق استان ایلام",
        "سازمان بهزیستی کشور",
        "شیرخوارگاه و خانه نوباوگان خاتم الانبیاء خراسان جنوبی",
        "مرکز اورژانس خدمات اجتماعی الزهرا خراسان جنوبی",
        "خانه سلامت(دختران پناهجو) رسالت خراسان رضوی",
        "خانه کودکان خیابانی فدائیان اسلام خراسان رضوی",
        "شیرخوارگاه و خانه نوباوگان حضرت علی اصغر خراسان رضوی",
      ],
      datasets: [
        {
          label: "ظرفیت مشاغل درخواستی",
          data: [
            214, 229, 249, 268, 196, 288, 161, 176, 142, 214, 122, 229, 196, 176, 142, 102, 25, 219, 239, 259, 278, 1000, 181, 278, 161, 151, 156, 161, 187,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    descriptionBoxes: [
      {
        id: 1,
        text: "بیشترین ظرفیت درخواستی: شرکت توسعه منابع آب و نیروی ایران با ۱۰۰۰ نفر (۱۷.۰٪)",
      },
      {
        id: 2,
        text: "کمترین ظرفیت درخواستی: شرکت کاویان سازه آژند با ۲۵ نفر (۰.۴٪)",
      },
    ],
    date: "۱۴۰۳/۱۲/۱۲",
  }
];

const ReportDetails = ({ report }) => {
  return (
    <div className="report-details">
      <h3>{report.title}</h3>
      <div className="chart-wrapper">
        <ChartComponent
          chartType={report.chartType}
          filters={report.filters}
          data={report.data} // داده‌ها رو می‌فرستیم
        />
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
  const { reports: dynamicReports } = useReports();
  const [selectedReport, setSelectedReport] = useState("all");

  const reports = [...staticReports, ...dynamicReports];

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
      <DotLottieReact
        src="https://lottie.host/1ffa5243-af25-4d2b-a0b7-80c45b5f6504/eMmMth4rX1.lottie"
        loop
        autoplay
        className="lottie-background"
      />
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
