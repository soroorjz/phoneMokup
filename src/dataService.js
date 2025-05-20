import axios from "axios";
import { organizerColors } from "./Components/MainPageComps/colors";
import moment from "jalali-moment";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let tokenExpiration = null;

const fetchToken = async (force = false) => {
  const cachedToken = localStorage.getItem("RayanToken");
  const now = Date.now();

  if (cachedToken && tokenExpiration > now + 1000 * 30 && !force) {
    console.log("استفاده از توکن کش‌شده");
    return cachedToken;
  }

  try {
    const response = await fetch("/api/auth", {
      // تغییر به /api/auth برای استفاده از پروکسی
      headers: {
        "RAYAN-USERNAME": "S.JAMEIE",
        "RAYAN-PASSWORD": "1156789",
        "RAYAN-DEBUG": "TRUE",
        "RAYAN-NOCATCH": "TRUE",
      },
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`خطای HTTP! کد وضعیت: ${response.status}`);
    }
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("RayanToken", token);
    tokenExpiration = now + 1000 * 60 * 5; // 5 دقیقه انقضا
    console.log("توکن دریافت‌شده:", token);
    return token;
  } catch (err) {
    console.error("خطا در دریافت توکن:", err);
    throw new Error("خطا در دریافت توکن!");
  }
};

apiClient.interceptors.request.use(async (config) => {
  const token = await fetchToken();
  config.headers["Rayan-Token"] = token;
  config.headers["Rayan-Debug"] = "TRUE";
  config.headers["RAYAN-NOCATCH"] = "TRUE";
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await fetchToken(true);
      error.config.headers["Rayan-Token"] = localStorage.getItem("RayanToken");
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

export const fetchTotalCandidates = async () => {
  try {
    const response = await apiClient.get("/preregister/preregisters");
    const candidates = response.data;
    console.log("کل داوطلب‌ها:", candidates);
    return candidates.length;
  } catch (error) {
    console.error("خطا در دریافت تعداد کل داوطلب‌ها:", error);
    return 0;
  }
};

export const fetchHandednessData = async () => {
  try {
    const preregisterResponse = await apiClient.get(
      "/preregister/preregisters"
    );
    const candidates = preregisterResponse.data;

    const applicantResponse = await apiClient.get("/applicant/applicants");
    const applicants = applicantResponse.data;

    const profileResponse = await apiClient.get("/profile/profiles");
    const profiles = profileResponse.data;

    const handednessData = candidates.map((candidate) => {
      const applicant = applicants.find(
        (a) => a.applicantId === candidate.preRegisterApplicantRef
      );
      const profile = profiles.find(
        (p) => p.profileId === applicant?.applicantProfileRef
      );
      return {
        nationalCode: candidate.preRegisterNationalCode,
        handedness: profile?.profileIsLeftHand === "Y" ? "چپ‌دست" : "راست‌دست",
      };
    });

    const leftHanded = handednessData.filter(
      (d) => d.handedness === "چپ‌دست"
    ).length;
    const rightHanded = handednessData.filter(
      (d) => d.handedness === "راست‌دست"
    ).length;

    console.log("داده‌های چپ‌دست/راست‌دست:", handednessData);
    return {
      labels: ["چپ‌دست", "راست‌دست"],
      datasets: [
        {
          data: [leftHanded, rightHanded],
          backgroundColor: ["#ff6384", "#36a2eb"],
        },
      ],
    };
  } catch (error) {
    console.error("خطا در دریافت داده‌های چپ‌دست/راست‌دست:", error);
    return {
      labels: ["چپ‌دست", "راست‌دست"],
      datasets: [{ data: [30, 70], backgroundColor: ["#ff6384", "#36a2eb"] }], // داده تستی
    };
  }
};

export const fetchReligionData = async () => {
  try {
    const preregisterResponse = await apiClient.get(
      "/preregister/preregisters"
    );
    const candidates = preregisterResponse.data;

    const applicantResponse = await apiClient.get("/applicant/applicants");
    const applicants = applicantResponse.data;

    const profileResponse = await apiClient.get("/profile/profiles");
    const profiles = profileResponse.data;

    const religionResponse = await apiClient.get("/religion/religions");
    const religions = religionResponse.data;

    const religionData = candidates.map((candidate) => {
      const applicant = applicants.find(
        (a) => a.applicantId === candidate.preRegisterApplicantRef
      );
      const profile = profiles.find(
        (p) => p.profileId === applicant?.applicantProfileRef
      );
      const religion = religions.find(
        (r) => r.religionId === profile?.profileReligionRef
      );

      if (!religion) {
        console.log(`داوطلب نامشخص:`, {
          preRegisterId: candidate.preRegisterId,
          preRegisterApplicantRef: candidate.preRegisterApplicantRef,
          applicantId: applicant?.applicantId,
          profileId: profile?.profileId,
          profileReligionRef: profile?.profileReligionRef,
        });
      }

      return {
        nationalCode: candidate.preRegisterNationalCode,
        religion: religion?.religionName || "نامشخص",
      };
    });

    const religionCounts = religionData.reduce((acc, data) => {
      acc[data.religion] = (acc[data.religion] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(religionCounts);
    const counts = Object.values(religionCounts);

    const religionChartData = {
      labels,
      datasets: [
        {
          label: "تعداد داوطلب‌ها",
          data: counts,
          backgroundColor: labels.map(
            (_, i) =>
              [
                "#ff6384",
                "#36a2eb",
                "#ffce56",
                "#4bc0c0",
                "#9966ff",
                "#ff9f40",
                "#c9cbcf",
                "#6a737b",
              ][i % 8]
          ),
        },
      ],
    };

    console.log("داده‌های دین:", religionData);
    console.log("دیتاست نمودار دین:", religionChartData);
    return religionChartData;
  } catch (error) {
    console.error("خطا در دریافت داده‌های دین:", error);
    return {
      labels: ["اسلام", "مسیحیت", "سایر"],
      datasets: [
        {
          label: "تعداد داوطلب‌ها",
          data: [80, 10, 10],
          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        },
      ],
    }; // داده تستی
  }
};

export const fetchProvinceData = async () => {
  try {
    const preregisterResponse = await apiClient.get(
      "/preregister/preregisters"
    );
    const candidates = preregisterResponse.data;
    console.log("داوطلب‌ها از /preregister/preregisters:", candidates);

    const geographyResponse = await apiClient.get("/geography/geographies");
    const geographies = geographyResponse.data;
    console.log("استان‌ها از /geography/geographies:", geographies);

    const provinceIdMap = {
      1: "IR-01", // آذربایجان شرقی
      2: "IR-02", // آذربایجان غربی
      3: "IR-03", // اردبیل
      4: "IR-04", // اصفهان
      5: "IR-32", // البرز
      6: "IR-05", // ایلام
      7: "IR-06", // بوشهر
      8: "IR-07", // تهران
      9: "IR-08", // چهارمحال و بختیاری
      10: "IR-29", // خراسان جنوبی
      11: "IR-30", // خراسان رضوی
      12: "IR-31", // خراسان شمالی
      13: "IR-10", // خوزستان
      14: "IR-11", // زنجان
      15: "IR-12", // سمنان
      16: "IR-13", // سیستان و بلوچستان
      17: "IR-14", // فارس
      18: "IR-28", // قزوین
      19: "IR-26", // قم
      20: "IR-16", // کردستان
      21: "IR-15", // کرمان
      22: "IR-17", // کرمانشاه
      23: "IR-18", // کهگیلویه و بویراحمد
      24: "IR-27", // گلستان
      25: "IR-19", // گیلان
      26: "IR-20", // لرستان
      27: "IR-21", // مازندران
      28: "IR-22", // مرکزی
      29: "IR-23", // هرمزگان
      30: "IR-24", // همدان
      31: "IR-25", // یزد
    };

    const provinceMap = [
      { id: "IR-01", name: "آذربايجان شرقي" },
      { id: "IR-02", name: "آذربايجان غربي" },
      { id: "IR-03", name: "اردبيل" },
      { id: "IR-04", name: "اصفهان" },
      { id: "IR-32", name: "البرز" },
      { id: "IR-05", name: "ايلام" },
      { id: "IR-06", name: "بوشهر" },
      { id: "IR-07", name: "تهران" },
      { id: "IR-08", name: "چهارمحال و بختياري" },
      { id: "IR-29", name: "خراسان جنوبي" },
      { id: "IR-30", name: "خراسان رضوي" },
      { id: "IR-31", name: "خراسان شمالي" },
      { id: "IR-10", name: "خوزستان" },
      { id: "IR-11", name: "زنجان" },
      { id: "IR-12", name: "سمنان" },
      { id: "IR-13", name: "سيستان و بلوچستان" },
      { id: "IR-14", name: "فارس" },
      { id: "IR-28", name: "قزوين" },
      { id: "IR-26", name: "قم" },
      { id: "IR-16", name: "كردستان" },
      { id: "IR-15", name: "كرمان" },
      { id: "IR-17", name: "كرمانشاه" },
      { id: "IR-18", name: "كهكيلويه و بويراحمد" },
      { id: "IR-27", name: "گلستان" },
      { id: "IR-19", name: "گيلان" },
      { id: "IR-20", name: "لرستان" },
      { id: "IR-21", name: "مازندران" },
      { id: "IR-22", name: "مركزي" },
      { id: "IR-23", name: "هرمزگان" },
      { id: "IR-24", name: "همدان" },
      { id: "IR-25", name: "يزد" },
    ];

    const provinceData = candidates.map((candidate) => {
      const geography = geographies.find(
        (g) => g.geographyId === candidate.preRegisterSelectedProvince
      );
      console.log(`داوطلب ${candidate.preRegisterId}:`, {
        preRegisterSelectedProvince: candidate.preRegisterSelectedProvince,
        geographyName: geography?.geographyName || "نامشخص",
      });
      return {
        provinceName: geography?.geographyName || "نامشخص",
        geographyId: candidate.preRegisterSelectedProvince,
      };
    });

    const provinceCounts = provinceData.reduce((acc, data) => {
      acc[data.provinceName] = (acc[data.provinceName] || 0) + 1;
      return acc;
    }, {});
    console.log("شمارش استان‌ها:", provinceCounts);

    const amChartData = provinceMap.map((province) => {
      const geoId = provinceData.find(
        (p) => p.provinceName === province.name
      )?.geographyId;
      const expectedId = Object.keys(provinceIdMap).find(
        (key) => provinceIdMap[key] === province.id
      );
      const value =
        geoId && provinceIdMap[geoId] === province.id
          ? provinceCounts[province.name] || 0
          : 0;
      return {
        id: province.id,
        value: value,
        name: province.name,
      };
    });

    console.log("داده‌های نقشه استان‌ها:", amChartData);
    return amChartData;
  } catch (error) {
    console.error("خطا در دریافت داده‌های استان:", error);
    return [
      { id: "IR-01", name: "آذربايجان شرقي", value: 50 },
      { id: "IR-02", name: "آذربايجان غربي", value: 30 },
      { id: "IR-03", name: "اردبيل", value: 20 },
      { id: "IR-04", name: "اصفهان", value: 70 },
      { id: "IR-32", name: "البرز", value: 40 },
      { id: "IR-05", name: "ايلام", value: 10 },
      { id: "IR-06", name: "بوشهر", value: 15 },
      { id: "IR-07", name: "تهران", value: 100 },
      { id: "IR-08", name: "چهارمحال و بختياري", value: 5 },
      { id: "IR-29", name: "خراسان جنوبي", value: 25 },
      { id: "IR-30", name: "خراسان رضوي", value: 60 },
      { id: "IR-31", name: "خراسان شمالي", value: 15 },
      { id: "IR-10", name: "خوزستان", value: 45 },
      { id: "IR-11", name: "زنجان", value: 20 },
      { id: "IR-12", name: "سمنان", value: 10 },
      { id: "IR-13", name: "سيستان و بلوچستان", value: 30 },
      { id: "IR-14", name: "فارس", value: 80 },
      { id: "IR-28", name: "قزوين", value: 25 },
      { id: "IR-26", name: "قم", value: 15 },
      { id: "IR-16", name: "كردستان", value: 20 },
      { id: "IR-15", name: "كرمان", value: 35 },
      { id: "IR-17", name: "كرمانشاه", value: 25 },
      { id: "IR-18", name: "كهكيلويه و بويراحمد", value: 10 },
      { id: "IR-27", name: "گلستان", value: 30 },
      { id: "IR-19", name: "گيلان", value: 40 },
      { id: "IR-20", name: "لرستان", value: 20 },
      { id: "IR-21", name: "مازندران", value: 50 },
      { id: "IR-22", name: "مركزي", value: 25 },
      { id: "IR-23", name: "هرمزگان", value: 15 },
      { id: "IR-24", name: "همدان", value: 30 },
      { id: "IR-25", name: "يزد", value: 20 },
    ]; // داده تستی کامل برای همه استان‌ها
  }
};

export const fetchExamsData = async () => {
  try {
    const preregisterResponse = await apiClient.get(
      "/preregister/preregisters"
    );
    const candidates = preregisterResponse.data;
    const handednessData = await fetchHandednessData();
    const religionData = await fetchReligionData();
    const provinceData = await fetchProvinceData();

    const applicantResponse = await apiClient.get("/applicant/applicants");
    const applicants = applicantResponse.data;
    const profileResponse = await apiClient.get("/profile/profiles");
    const profiles = profileResponse.data;
    const marriageResponse = await apiClient.get("/marriage/marriages");
    const marriages = marriageResponse.data;
    const examResponse = await apiClient.get("/exam/exams");
    const exams = examResponse.data;
    const organizerResponse = await apiClient.get("/organizer/organizers");
    const organizers = organizerResponse.data;

    if (!candidates.length) {
      console.warn("هیچ داوطلبی در پاسخ یافت نشد");
      return { examData: [], organizers: [] };
    }

    const totalCandidates = candidates.length;

    // محاسبه سن‌ها
    const today = moment();
    const ages = candidates
      .map((candidate) => {
        const applicant = applicants.find(
          (a) => a.applicantId === candidate.preRegisterApplicantRef
        );
        const profile = profiles.find(
          (p) => p.profileId === applicant?.applicantProfileRef
        );
        if (!profile?.profileBirthDate) return null;
        const birthDate = moment(profile.profileBirthDate, "jYYYY/jMM/jDD");
        if (!birthDate.isValid()) return null;
        return today.diff(birthDate, "years");
      })
      .filter((age) => age !== null && age >= 0 && age < 150);

    const averageAge = ages.length
      ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)
      : "نامشخص";

    const ageBins = {};
    ages.forEach((age) => {
      const bin = Math.floor(age / 2) * 2;
      ageBins[bin] = (ageBins[bin] || 0) + 1;
    });
    const ageHistogramData = {
      labels: Object.keys(ageBins).map((bin) => `${bin}-${parseInt(bin) + 1}`),
      datasets: [
        {
          label: "تعداد داوطلب‌ها",
          data: Object.values(ageBins),
          backgroundColor: "rgba(103, 183, 220, 0.6)",
          borderColor: "rgba(103, 183, 220, 1)",
          borderWidth: 1,
          barThickness: 10,
        },
      ],
    };

    // تأهل
    const marriageCounts = candidates.reduce((acc, candidate) => {
      const applicant = applicants.find(
        (a) => a.applicantId === candidate.preRegisterApplicantRef
      );
      const profile = profiles.find(
        (p) => p.profileId === applicant?.applicantProfileRef
      );
      const marriage = marriages.find(
        (m) => m.marriageId === profile?.profileMarriageRef
      );
      const status = marriage?.marriageName || "نامشخص";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const marriedCount = marriageCounts["متاهل"] || 0;

    // دونات تأهل
    const marriageDoughnutData = {
      labels: Object.keys(marriageCounts),
      datasets: [
        {
          data: Object.values(marriageCounts),
          backgroundColor: ["#dc67dc", "#67b7dc", "#a367dc"],
          borderWidth: 1,
        },
      ],
    };

    // استان با بیشترین داوطلب
    const maxProvince = provinceData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      { value: 0, name: "نامشخص" }
    );

    // دین غالب
    const religionCounts = religionData.datasets[0].data;
    const religionLabels = religionData.labels;
    const maxReligionIndex = religionCounts.indexOf(
      Math.max(...religionCounts)
    );
    const dominantReligion = religionLabels[maxReligionIndex] || "نامشخص";

    // محاسبه تعداد داوطلب‌ها برای هر آزمون
    const examCounts = exams.reduce((acc, exam) => {
      acc[exam.examId] = { name: exam.examName, count: 0 };
      return acc;
    }, {});
    candidates.forEach((candidate) => {
      const examId = candidate.preRegisterExamRef;
      if (examCounts[examId]) {
        examCounts[examId].count += 1;
      } else {
        console.warn(`آزمون با ID ${examId} در لیست آزمون‌ها یافت نشد`);
      }
    });

    const examBarData = {
      labels: Object.values(examCounts).map((exam) => exam.name),
      datasets: [
        {
          label: "تعداد داوطلب‌ها",
          data: Object.values(examCounts).map((exam) => exam.count),
          backgroundColor: "rgba(220, 103, 220, 0.6)",
          borderColor: "rgba(220, 103, 220, 1)",
          borderWidth: 1,
          ticks: { maxRotation: 45, minRotation: 45 },
        },
      ],
    };

    // پیدا کردن آزمون با بیشترین داوطلب
    const maxExam = Object.values(examCounts).reduce(
      (max, current) => (current.count > max.count ? current : max),
      { name: "نامشخص", count: 0 }
    );

    const organizerExamData = organizers.reduce((acc, organizer) => {
      acc[organizer.organizerId] = {
        name: organizer.organizerName,
        exams: [],
      };
      return acc;
    }, {});

    exams.forEach((exam) => {
      const organizerId = exam.examOrganizerRef;
      if (organizerExamData[organizerId]) {
        organizerExamData[organizerId].exams.push(exam.examName);
      } else {
        console.warn(`مجری با ID ${organizerId} در لیست مجری‌ها یافت نشد`);
      }
    });

    const nestedLabels = [];
    const innerData = []; // مجری‌ها (داخلی)
    const outerData = []; // آزمون‌ها (خارجی)
    const innerColors = []; // رنگ‌های مجری‌ها
    const outerColors = []; // رنگ‌های آزمون‌ها

    const organizerColorsLocal = {
      1: "#FF4500", // مرکز آموزشی و پژوهشی رایانگان
      2: "#32CD32", // شرکت آزمون گستر
      4: "#FFD700", // سازمان سنجش و آموزش کشور
      5: "#00CED1", // جهاد دانشگاهی
    };
    const maxOrganizer = Object.values(organizerExamData).reduce(
      (max, current) =>
        current.exams.length > max.exams.length ? current : max,
      { name: "نامشخص", exams: [] }
    );
    organizers.forEach((organizer) => {
      const organizerId = String(organizer.organizerId);
      console.log(
        `پردازش مجری: ${organizer.organizerName} (ID: ${organizerId})`
      );
      // لایه داخلی: مجری‌ها
      nestedLabels.push(organizer.organizerName);
      innerData.push(
        organizerExamData[organizer.organizerId].exams.length || 1
      );
      innerColors.push(organizerColorsLocal[organizerId] || "#CCCCCC");

      // لایه خارجی: آزمون‌ها
      if (organizerExamData[organizer.organizerId].exams.length > 0) {
        organizerExamData[organizer.organizerId].exams.forEach(
          (examName, examIndex) => {
            console.log(
              `افزودن آزمون: ${examName} برای مجری: ${organizer.organizerName}`
            );
            nestedLabels.push(examName);
            outerData.push(1);
            outerColors.push(
              `hsl(${270 - examIndex * 20}, 70%, ${50 - examIndex * 5}%)`
            );
          }
        );
      } else {
        nestedLabels.push(`${organizer.organizerName} - بدون آزمون`);
        outerData.push(1);
        outerColors.push("rgba(0, 0, 0, 0)");
      }
    });

    const nestedDoughnutData = {
      labels: nestedLabels,
      datasets: [
        {
          label: "آزمون‌ها",
          data: outerData,
          backgroundColor: outerColors,
          borderWidth: 1,
          weight: 2, // لایه خارجی
        },
        {
          label: "مجری‌ها",
          data: innerData,
          backgroundColor: innerColors,
          borderWidth: 1,
          weight: 1, // لایه داخلی
        },
      ],
    };

    const examData = [
      {
        title: "گزارش‌های مربوط به کلیه‌ی آزمون‌ها",
        reportSlides: [
          {
            title: "مقایسه داوطلب‌های چپ‌دست و راست‌دست",
            type: "pie",
            data: handednessData,
          },
          {
            title: "پراکندگی تعداد داوطلب‌ها در استان‌های کشور",
            type: "map",
            data: provinceData,
          },
          {
            title: "توزیع دین داوطلب‌ها",
            type: "bar",
            data: religionData,
          },
          {
            title: "توزیع سنی داوطلب‌ها",
            type: "histogram",
            data: ageHistogramData,
          },
          {
            title: "وضعیت تأهل داوطلب‌ها",
            type: "doughnut",
            data: marriageDoughnutData,
          },
        ],
        examStats: [
          { label: "تعداد کل شرکت‌کنندگان", value: `${totalCandidates} نفر` },
          { label: "تعداد داوطلب‌های متأهل", value: `${marriedCount} نفر` },
          { label: "میانگین سنی داوطلب‌ها", value: `${averageAge} سال` },
          {
            label: "بیشترین داوطلب‌ها از استان",
            value: `${maxProvince.name} (${maxProvince.value} نفر)`,
          },
          {
            label: "دین غالب داوطلب‌ها",
            value: dominantReligion,
          },
          {
            label: "تعداد داوطلب‌های چپ‌دست",
            value: `${handednessData.datasets[0].data[0]} نفر`,
          },
        ],
        religionChart: religionData,
      },
      {
        title: "مقایسه آزمون‌ها",
        reportSlides: [
          {
            title: "تعداد داوطلب‌ها در هر آزمون",
            type: "bar",
            data: examBarData,
          },
          {
            title: "توزیع آزمون‌ها بر اساس مجری",
            type: "nestedDoughnut",
            data: nestedDoughnutData,
          },
        ],
        examStats: [
          {
            label: "بیشترین تعداد داوطلب",
            value: `${maxExam.name} (${maxExam.count} نفر)`,
          },
          {
            label: "بیشترین آزمون برگزار شده توسط",
            value: `${maxOrganizer.name} (${maxOrganizer.exams.length} آزمون)`,
          },
        ],
      },
    ];

    console.log("داده‌های نهایی fetchExamsData:", examData);
    console.log("داده‌های دونات تودرتو:", nestedDoughnutData);
    console.log("دیتای organizers:", organizers);
    return { examData, organizers };
  } catch (error) {
    console.error("خطا در دریافت داده‌های آزمون‌ها:", error);
    return {
      examData: [
        {
          title: "گزارش‌های مربوط به کلیه‌ی آزمون‌ها",
          reportSlides: [
            {
              title: "مقایسه داوطلب‌های چپ‌دست و راست‌دست",
              type: "pie",
              data: {
                labels: ["چپ‌دست", "راست‌دست"],
                datasets: [
                  {
                    data: [30, 70],
                    backgroundColor: ["#ff6384", "#36a2eb"],
                  },
                ],
              },
            },
            {
              title: "پراکندگی تعداد داوطلب‌ها در استان‌های کشور",
              type: "map",
              data: [
                { id: "IR-01", name: "آذربايجان شرقي", value: 50 },
                { id: "IR-02", name: "آذربايجان غربي", value: 30 },
                { id: "IR-07", name: "تهران", value: 100 },
                { id: "IR-04", name: "اصفهان", value: 70 },
                { id: "IR-32", name: "البرز", value: 20 },
                { id: "IR-05", name: "ايلام", value: 10 },
                { id: "IR-06", name: "بوشهر", value: 15 },
                { id: "IR-08", name: "چهارمحال و بختياري", value: 5 },
                { id: "IR-29", name: "خراسان جنوبي", value: 25 },
                { id: "IR-30", name: "خراسان رضوي", value: 60 },
                { id: "IR-31", name: "خراسان شمالي", value: 15 },
                { id: "IR-10", name: "خوزستان", value: 40 },
                { id: "IR-11", name: "زنجان", value: 20 },
                { id: "IR-12", name: "سمنان", value: 10 },
                { id: "IR-13", name: "سيستان و بلوچستان", value: 30 },
                { id: "IR-14", name: "فارس", value: 80 },
                { id: "IR-28", name: "قزوين", value: 25 },
                { id: "IR-26", name: "قم", value: 15 },
                { id: "IR-16", name: "كردستان", value: 20 },
                { id: "IR-15", name: "كرمان", value: 35 },
                { id: "IR-17", name: "كرمانشاه", value: 25 },
                { id: "IR-18", name: "كهكيلويه و بويراحمد", value: 10 },
                { id: "IR-27", name: "گلستان", value: 30 },
                { id: "IR-19", name: "گيلان", value: 40 },
                { id: "IR-20", name: "لرستان", value: 20 },
                { id: "IR-21", name: "مازندران", value: 50 },
                { id: "IR-22", name: "مركزي", value: 25 },
                { id: "IR-23", name: "هرمزگان", value: 15 },
                { id: "IR-24", name: "همدان", value: 30 },
                { id: "IR-25", name: "يزد", value: 20 },
              ],
            },
            {
              title: "توزیع دین داوطلب‌ها",
              type: "bar",
              data: {
                labels: ["اسلام", "مسیحیت", "سایر"],
                datasets: [
                  {
                    label: "تعداد داوطلب‌ها",
                    data: [80, 10, 10],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
                  },
                ],
              },
            },
            {
              title: "توزیع سنی داوطلب‌ها",
              type: "histogram",
              data: {
                labels: ["20-21", "22-23", "24-25"],
                datasets: [
                  {
                    label: "تعداد داوطلب‌ها",
                    data: [50, 100, 80],
                    backgroundColor: "rgba(103, 183, 220, 0.6)",
                    borderColor: "rgba(103, 183, 220, 1)",
                    borderWidth: 1,
                    barThickness: 10,
                  },
                ],
              },
            },
            {
              title: "وضعیت تأهل داوطلب‌ها",
              type: "doughnut",
              data: {
                labels: ["متاهل", "مجرد"],
                datasets: [
                  {
                    data: [40, 60],
                    backgroundColor: ["#dc67dc", "#67b7dc"],
                    borderWidth: 1,
                  },
                ],
              },
            },
          ],
          examStats: [
            { label: "تعداد کل شرکت‌کنندگان", value: "100 نفر" },
            { label: "تعداد داوطلب‌های متأهل", value: "40 نفر" },
            { label: "میانگین سنی داوطلب‌ها", value: "25 سال" },
            { label: "بیشترین داوطلب‌ها از استان", value: "تهران (100 نفر)" },
            { label: "دین غالب داوطلب‌ها", value: "اسلام" },
            { label: "تعداد داوطلب‌های چپ‌دست", value: "30 نفر" },
          ],
          religionChart: {
            labels: ["اسلام", "مسیحیت", "سایر"],
            datasets: [
              {
                label: "تعداد داوطلب‌ها",
                data: [80, 10, 10],
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
              },
            ],
          },
        },
        {
          title: "مقایسه آزمون‌ها",
          reportSlides: [
            {
              title: "تعداد داوطلب‌ها در هر آزمون",
              type: "bar",
              data: {
                labels: ["آزمون ۱", "آزمون ۲", "آزمون ۳"],
                datasets: [
                  {
                    label: "تعداد داوطلب‌ها",
                    data: [50, 30, 20],
                    backgroundColor: "rgba(220, 103, 220, 0.6)",
                    borderColor: "rgba(220, 103, 220, 1)",
                    borderWidth: 1,
                  },
                ],
              },
            },
            {
              title: "توزیع آزمون‌ها بر اساس مجری",
              type: "nestedDoughnut",
              data: {
                labels: ["مجری ۱", "آزمون ۱", "آزمون ۲", "مجری ۲"],
                datasets: [
                  {
                    label: "آزمون‌ها",
                    data: [0, 1, 1, 0],
                    backgroundColor: [
                      "rgba(0, 0, 0, 0)",
                      "#ff9f40",
                      "#ffcd56",
                      "rgba(0, 0, 0, 0)",
                    ],
                    borderWidth: 1,
                    weight: 2,
                  },
                  {
                    label: "مجری‌ها",
                    data: [2, 0, 0, 1],
                    backgroundColor: [
                      "#FF4500",
                      "rgba(0, 0, 0, 0)",
                      "rgba(0, 0, 0, 0)",
                      "#32CD32",
                    ],
                    borderWidth: 1,
                    weight: 1,
                  },
                ],
              },
            },
          ],
          examStats: [
            { label: "بیشترین تعداد داوطلب", value: "آزمون ۱ (50 نفر)" },
            {
              label: "بیشترین آزمون برگزار شده توسط",
              value: "مجری ۱ (2 آزمون)",
            },
          ],
        },
      ],
      organizers: [
        { organizerId: 1, organizerName: "مجری ۱" },
        { organizerId: 2, organizerName: "مجری ۲" },
      ],
    };
  }
};
