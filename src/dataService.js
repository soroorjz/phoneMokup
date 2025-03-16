import axios from "axios";
import moment from "jalali-moment";
const apiClient = axios.create({
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
    return cachedToken;
  }

  try {
    const response = await fetch("/api/auth", {
      headers: {
        "RAYAN-USERNAME": "S.JAMEIE",
        "RAYAN-PASSWORD": "1156789",
        "RAYAN-DEBUG": "TRUE",
        "RAYAN-NOCATCH": "TRUE",
      },
      method: "POST",
    });
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("RayanToken", token);
    tokenExpiration = now + 1000 * 60 * 5;
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
    console.error("Error fetching total candidates:", error);
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
    console.error("Error fetching handedness data:", error);
    return {
      labels: ["چپ‌دست", "راست‌دست"],
      datasets: [{ data: [0, 0], backgroundColor: ["#ff6384", "#36a2eb"] }],
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
    console.error("Error fetching religion data:", error);
    return {
      labels: [],
      datasets: [{ label: "تعداد داوطلب‌ها", data: [], backgroundColor: [] }],
    };
  }
};

export const fetchProvinceData = async () => {
  try {
    //  داوطلب‌ها
    const preregisterResponse = await apiClient.get(
      "/preregister/preregisters"
    );
    const candidates = preregisterResponse.data;
    console.log("داوطلب‌ها از /preregister/preregisters:", candidates);

    //  انتخاب‌ها
    const choiceResponse = await apiClient.get("/choice/choices");
    const choices = choiceResponse.data;
    console.log("انتخاب‌ها از /choice/choices:", choices);

    //   ( استان‌ها)
    const geographyResponse = await apiClient.get("/geography/geographies");
    const geographies = geographyResponse.data.filter(
      (g) => g.geographyParent === null
    );
    console.log("استان‌ها از /geography/geographies:", geographies);

    const provinceMap = [
      { id: "IR-01", name: "آذربایجان شرقی" },
      { id: "IR-02", name: "آذربایجان غربی" },
      { id: "IR-03", name: "اردبیل" },
      { id: "IR-04", name: "اصفهان" },
      { id: "IR-32", name: "البرز" },
      { id: "IR-05", name: "ایلام" },
      { id: "IR-06", name: "بوشهر" },
      { id: "IR-07", name: "تهران" },
      { id: "IR-08", name: "چهارمحال و بختیاری" },
      { id: "IR-29", name: "خراسان جنوبی" },
      { id: "IR-30", name: "خراسان رضوی" },
      { id: "IR-31", name: "خراسان شمالی" },
      { id: "IR-10", name: "خوزستان" },
      { id: "IR-11", name: "زنجان" },
      { id: "IR-12", name: "سمنان" },
      { id: "IR-13", name: "سیستان و بلوچستان" },
      { id: "IR-14", name: "فارس" },
      { id: "IR-28", name: "قزوین" },
      { id: "IR-26", name: "قم" },
      { id: "IR-16", name: "کردستان" },
      { id: "IR-15", name: "کرمان" },
      { id: "IR-17", name: "کرمانشاه" },
      { id: "IR-18", name: "کهگیلویه و بویراحمد" },
      { id: "IR-27", name: "گلستان" },
      { id: "IR-19", name: "گیلان" },
      { id: "IR-20", name: "لرستان" },
      { id: "IR-21", name: "مازندران" },
      { id: "IR-22", name: "مرکزی" },
      { id: "IR-23", name: "هرمزگان" },
      { id: "IR-24", name: "همدان" },
      { id: "IR-25", name: "یزد" },
    ];

    const provinceData = candidates.map((candidate) => {
      const choice = choices.find(
        (c) => c.choicePreRegisterRef === candidate.preRegisterId
      );
      const province = geographies.find(
        (g) => g.geographyId === choice?.choiceExamProvinceRef
      );
      console.log(`داوطلب ${candidate.preRegisterId}:`, {
        choiceFound: !!choice,
        choicePreRegisterRef: choice?.choicePreRegisterRef,
        choiceExamProvinceRef: choice?.choiceExamProvinceRef,
        provinceName: province?.geographyName || "نامشخص",
      });
      return {
        provinceName: province?.geographyName || "نامشخص",
      };
    });

    const provinceCounts = provinceData.reduce((acc, data) => {
      acc[data.provinceName] = (acc[data.provinceName] || 0) + 1;
      return acc;
    }, {});
    console.log("شمارش استان‌ها:", provinceCounts);

    const amChartData = provinceMap.map((province) => ({
      id: province.id,
      value: provinceCounts[province.name] || 0,
      name: province.name,
    }));

    console.log("داده‌های نقشه استان‌ها:", amChartData);
    return amChartData;
  } catch (error) {
    console.error("Error fetching province data:", error);
    const provinceMapFallback = [
      { id: "IR-01", name: "آذربایجان شرقی" },
      { id: "IR-02", name: "آذربایجان غربی" },
      { id: "IR-03", name: "اردبیل" },
      { id: "IR-04", name: "اصفهان" },
      { id: "IR-32", name: "البرز" },
      { id: "IR-05", name: "ایلام" },
      { id: "IR-06", name: "بوشهر" },
      { id: "IR-07", name: "تهران" },
      { id: "IR-08", name: "چهارمحال و بختیاری" },
      { id: "IR-29", name: "خراسان جنوبی" },
      { id: "IR-30", name: "خراسان رضوی" },
      { id: "IR-31", name: "خراسان شمالی" },
      { id: "IR-10", name: "خوزستان" },
      { id: "IR-11", name: "زنجان" },
      { id: "IR-12", name: "سمنان" },
      { id: "IR-13", name: "سیستان و بلوچستان" },
      { id: "IR-14", name: "فارس" },
      { id: "IR-28", name: "قزوین" },
      { id: "IR-26", name: "قم" },
      { id: "IR-16", name: "کردستان" },
      { id: "IR-15", name: "کرمان" },
      { id: "IR-17", name: "کرمانشاه" },
      { id: "IR-18", name: "کهگیلویه و بویراحمد" },
      { id: "IR-27", name: "گلستان" },
      { id: "IR-19", name: "گیلان" },
      { id: "IR-20", name: "لرستان" },
      { id: "IR-21", name: "مازندران" },
      { id: "IR-22", name: "مرکزی" },
      { id: "IR-23", name: "هرمزگان" },
      { id: "IR-24", name: "همدان" },
      { id: "IR-25", name: "یزد" },
    ];
    return provinceMapFallback.map((province) => ({
      id: province.id,
      value: 0,
      name: province.name,
    }));
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

    if (!candidates.length) {
      console.warn("No candidates found in response");
      return [];
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

    //  تأهل
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

    //  دونات تأهل
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

    //   استان با بیشترین داوطلب
    const maxProvince = provinceData.reduce(
      (max, current) => (current.value > max.value ? current : max),
      { value: 0, name: "نامشخص" }
    );

    //   دین غالب
    const religionCounts = religionData.datasets[0].data;
    const religionLabels = religionData.labels;
    const maxReligionIndex = religionCounts.indexOf(
      Math.max(...religionCounts)
    );
    const dominantReligion = religionLabels[maxReligionIndex] || "نامشخص";

    const examData = {
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
    };

    console.log("داده‌های نهایی fetchExamsData:", examData);
    return [examData];
  } catch (error) {
    console.error("Error fetching exams data:", error);
    return [
      {
        title: "آزمون‌های پیش‌ثبت‌نام‌شده",
        reportSlides: [],
        examStats: [],
        religionChart: {
          labels: [],
          datasets: [
            { label: "تعداد داوطلب‌ها", data: [], backgroundColor: [] },
          ],
        },
      },
    ];
  }
};
