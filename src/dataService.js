// src/services/dataService.js
import axios from "axios";

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

      // لاگ برای دیباگ
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
      LABELS: [],
      datasets: [{ label: "تعداد داوطلب‌ها", data: [], backgroundColor: [] }],
    };
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

    if (!candidates.length) {
      console.warn("No candidates found in response");
      return [];
    }

    const totalCandidates = candidates.length;
    const examData = {
      title: "آزمون‌های پیش‌ثبت‌نام‌شده",
      reportSlides: [
        {
          title: "تعداد کل داوطلب‌ها",
          type: "pie",
          data: {
            labels: ["داوطلب‌ها"],
            datasets: [
              {
                data: [totalCandidates],
                backgroundColor: ["#6794dc"],
              },
            ],
          },
        },
        {
          title: "تحلیل چپ‌دست و راست‌دست",
          type: "pie",
          data: handednessData,
        },
      ],
      examStats: [
        { label: "تعداد کل شرکت‌کنندگان", value: `${totalCandidates} نفر` },
        {
          label: "چپ‌دست‌ها",
          value: `${handednessData.datasets[0].data[0]} نفر`,
        },
        {
          label: "راست‌دست‌ها",
          value: `${handednessData.datasets[0].data[1]} نفر`,
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
