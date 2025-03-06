import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useReports } from "../../pages/ExamAnalysis/ReportsContext";

const ExamAnalysisFilters = () => {
  const { updateFilters } = useReports();
  const [examTitles, setExamTitles] = useState([]);
  const [religions, setReligions] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [executiveBodies, setExecutiveBodies] = useState([]);
  const [genders, setGenders] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref برای سایدبار

  // تابع دریافت توکن (بدون تغییر)
  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post("/api/auth", null, {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
      });

      if (response.status !== 200) throw new Error("خطا در دریافت توکن!");

      const { token, expiresIn } = response.data;
      const expirationTime = Date.now() + expiresIn * 1000;
      setToken(token);
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      return token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  // بررسی انقضای توکن (بدون تغییر)
  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    if (!expirationTime) return true;
    return Date.now() > parseInt(expirationTime, 10);
  };

  // تابع دریافت داده‌ها (بدون تغییر)
  const fetchData = useCallback(async () => {
    try {
      let currentToken = token;
      if (!currentToken || isTokenExpired()) {
        currentToken = await fetchToken();
        if (!currentToken) return;
      }

      const cachedExamTitles = localStorage.getItem("ExamTitles");
      const cachedReligions = localStorage.getItem("Religions");
      const cachedQuotas = localStorage.getItem("Quotas");
      const cachedJobs = localStorage.getItem("Jobs");
      const cachedProvinces = localStorage.getItem("Provinces");
      const cachedGenders = localStorage.getItem("Genders");
      const cachedExecutiveBodies = localStorage.getItem("ExecutiveBodies");

      if (
        cachedExamTitles &&
        cachedReligions &&
        cachedQuotas &&
        cachedJobs &&
        cachedProvinces &&
        cachedGenders &&
        cachedExecutiveBodies
      ) {
        console.log("داده‌ها از کش خوانده شدند");
        setExamTitles(JSON.parse(cachedExamTitles));
        setReligions(JSON.parse(cachedReligions));
        setQuotas(JSON.parse(cachedQuotas));
        setJobs(JSON.parse(cachedJobs));
        setProvinces(JSON.parse(cachedProvinces));
        setGenders(JSON.parse(cachedGenders));
        setExecutiveBodies(JSON.parse(cachedExecutiveBodies));
        return;
      }

      const [
        examTitlesResponse,
        religionsResponse,
        quotasResponse,
        jobsResponse,
        provincesResponse,
        gendersResponse,
        executiveBodiesResponse,
      ] = await Promise.all([
        axios.get("/api/exam/exams", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/religion/religions", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/quota/quotas", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/job/jobs", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/gender/genders", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/executivebody/executivebodies", {
          headers: { "RAYAN-TOKEN": currentToken, "RAYAN-DEBUG": true },
        }),
      ]);

      if (
        examTitlesResponse.status !== 200 ||
        religionsResponse.status !== 200 ||
        quotasResponse.status !== 200 ||
        jobsResponse.status !== 200 ||
        provincesResponse.status !== 200 ||
        gendersResponse.status !== 200 ||
        executiveBodiesResponse.status !== 200
      ) {
        throw new Error("خطا در دریافت داده‌ها!");
      }

      const filteredProvinces = provincesResponse.data.filter(
        (province) => province.geographyParent === null
      );

      const filteredQuotas = quotasResponse.data.filter(
        (quota) => quota.quotaParent === null
      );

      setExamTitles(examTitlesResponse.data);
      setReligions(religionsResponse.data);
      setQuotas(filteredQuotas);
      setJobs(jobsResponse.data);
      setProvinces(filteredProvinces);
      setGenders(gendersResponse.data);
      setExecutiveBodies(executiveBodiesResponse.data);

      localStorage.setItem(
        "ExamTitles",
        JSON.stringify(examTitlesResponse.data)
      );
      localStorage.setItem("Religions", JSON.stringify(religionsResponse.data));
      localStorage.setItem("Quotas", JSON.stringify(filteredQuotas));
      localStorage.setItem("Jobs", JSON.stringify(jobsResponse.data));
      localStorage.setItem("Provinces", JSON.stringify(filteredProvinces));
      localStorage.setItem("Genders", JSON.stringify(gendersResponse.data));
      localStorage.setItem(
        "ExecutiveBodies",
        JSON.stringify(executiveBodiesResponse.data)
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    }
  }, [token, fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // تابع تغییر وضعیت سایدبار
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // تابع بستن سایدبار
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // مدیریت کلیک خارج از سایدبار
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="filters">
        {/* فیلتر عنوان آزمون جداگانه */}
        <select onChange={(e) => updateFilters("examId", e.target.value)}>
          <option value="">عنوان آزمون</option>
          {examTitles.map((exam) => (
            <option key={exam.examId} value={exam.examName}>
              {exam.examName}
            </option>
          ))}
        </select>

        {/* آیکون فیلتر برای باز کردن سایدبار */}
        <button className="filter-icon" onClick={toggleSidebar}>
          فیلترها
        </button>

        {/* سایدبار فیلترها */}
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          ref={sidebarRef}
        >
          <button className="close-btn" onClick={closeSidebar}>
            ✕
          </button>

          <select onChange={(e) => updateFilters("religion", e.target.value)}>
            <option value="">دین شرکت‌کنندگان</option>
            {religions.map((religion, index) => (
              <option key={index} value={religion.religionName}>
                {religion.religionName}
              </option>
            ))}
          </select>

          <select onChange={(e) => updateFilters("quota", e.target.value)}>
            <option value="">سهمیه</option>
            {quotas.map((quota) => (
              <option key={quota.id} value={quota.quotaTitle}>
                {quota.quotaTitle}
              </option>
            ))}
          </select>

          <select onChange={(e) => updateFilters("province", e.target.value)}>
            <option value="">استان</option>
            {provinces.map((province) => (
              <option
                key={province.geographyName}
                value={province.geographyName}
              >
                {province.geographyName}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => updateFilters("executiveBody", e.target.value)}
          >
            <option value="">دستگاه</option>
            {executiveBodies.map((executiveBody) => (
              <option
                key={executiveBody.executiveBodyName}
                value={executiveBody.executiveBodyName}
              >
                {executiveBody.executiveBodyName}
              </option>
            ))}
          </select>

          <select onChange={(e) => updateFilters("job", e.target.value)}>
            <option value="">شغل</option>
            {jobs.map((job) => (
              <option key={job.jobName} value={job.jobName}>
                {job.jobName}
              </option>
            ))}
          </select>

          <select onChange={(e) => updateFilters("gender", e.target.value)}>
            <option value="">جنسیت</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender.genderName}>
                {gender.genderName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExamAnalysisFilters;
