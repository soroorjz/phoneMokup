import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ExamAnalysisFilters = () => {
  const [examTitles, setExamTitles] = useState([]);
  const [religions, setReligions] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [executiveBodies, setExecutiveBodies] = useState([]);
  const [genders, setGenders] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); // نگهداری موقت توکن

  // تابع دریافت توکن
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
      const expirationTime = Date.now() + expiresIn * 1000; // زمان انقضا محاسبه می‌شود
      setToken(token); // توکن در حافظه موقت ذخیره می‌شود
      localStorage.setItem("tokenExpiration", expirationTime.toString()); // زمان انقضا در localStorage ذخیره می‌شود
      return token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  // بررسی انقضای توکن
  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    if (!expirationTime) return true; // اگر زمان انقضا وجود نداشت، توکن منقضی شده است
    return Date.now() > parseInt(expirationTime, 10); // بررسی زمان انقضا
  };

  const fetchData = useCallback(async () => {
    try {
      let currentToken = token;
      if (!currentToken || isTokenExpired()) {
        currentToken = await fetchToken(); // اگر توکن منقضی شده بود، توکن جدید دریافت می‌کنیم
        if (!currentToken) return;
      }

      // چک کردن کش
      const cachedExamTitles = localStorage.getItem("ExamTitles");
      const cachedReligions = localStorage.getItem("Religions");
      const cachedQuotas = localStorage.getItem("Quotas");
      const cachedJobs = localStorage.getItem("Jobs");
      const cachedProvinces = localStorage.getItem("Provinces");
      const cachedGenders = localStorage.getItem("Genders");
      const cachedExecutiveBodies = localStorage.getItem("ExecutiveBodies"); // چک کردن کش دستگاه‌ها

      if (
        cachedExamTitles &&
        cachedReligions &&
        cachedQuotas &&
        cachedJobs &&
        cachedProvinces &&
        cachedGenders &&
        cachedExecutiveBodies // اضافه کردن شرط برای دستگاه‌ها
      ) {
        console.log("داده‌ها از کش خوانده شدند");
        setExamTitles(JSON.parse(cachedExamTitles));
        setReligions(JSON.parse(cachedReligions));
        setQuotas(JSON.parse(cachedQuotas));
        setJobs(JSON.parse(cachedJobs));
        setProvinces(JSON.parse(cachedProvinces));
        setGenders(JSON.parse(cachedGenders));
        setExecutiveBodies(JSON.parse(cachedExecutiveBodies)); // اضافه کردن دستگاه‌ها
        return;
      }

      // درخواست همزمان برای همه داده‌ها
      const [
        examTitlesResponse,
        religionsResponse,
        quotasResponse,
        jobsResponse,
        provincesResponse,
        gendersResponse,
        executiveBodiesResponse, // اضافه کردن درخواست برای دستگاه‌ها
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
        }), // اضافه کردن درخواست برای دستگاه‌ها
      ]);

      // بررسی وضعیت پاسخ‌ها
      if (
        examTitlesResponse.status !== 200 ||
        religionsResponse.status !== 200 ||
        quotasResponse.status !== 200 ||
        jobsResponse.status !== 200 ||
        provincesResponse.status !== 200 ||
        gendersResponse.status !== 200 ||
        executiveBodiesResponse.status !== 200 // اضافه کردن بررسی برای دستگاه‌ها
      ) {
        throw new Error("خطا در دریافت داده‌ها!");
      }

      // فیلتر کردن استان‌ها: فقط geographyNameهایی که geographyParent آنها null است
      const filteredProvinces = provincesResponse.data.filter(
        (province) => province.geographyParent === null
      );

      // فیلتر کردن سهمیه‌ها: فقط quotaهایی که quotaParent آنها null است
      const filteredQuotas = quotasResponse.data.filter(
        (quota) => quota.quotaParent === null
      );

      // ذخیره داده‌ها در state
      setExamTitles(examTitlesResponse.data);
      setReligions(religionsResponse.data);
      setQuotas(filteredQuotas); // استفاده از سهمیه‌های فیلتر شده
      setJobs(jobsResponse.data);
      setProvinces(filteredProvinces); // استفاده از استان‌های فیلتر شده
      setGenders(gendersResponse.data);
      setExecutiveBodies(executiveBodiesResponse.data); // اضافه کردن دستگاه‌ها

      // ذخیره داده‌ها در localStorage
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
      ); // اضافه کردن دستگاه‌ها
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    }
  }, [token, fetchToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="filters">
        <select>
          <option>عنوان آزمون</option>
          {examTitles.map((exam) => (
            <option key={exam.examId} value={exam.examId}>
              {exam.examName}
            </option>
          ))}
        </select>

        <select id="religion" name="religion">
          <option value="">دین شرکت‌کنندگان</option>
          {religions.map((religion, index) => (
            <option key={index} value={religion.religionName}>
              {religion.religionName}
            </option>
          ))}
        </select>

        <select>
          <option>سهمیه</option>
          {quotas.map((quota) => (
            <option key={quota.id} value={quota.quotaTitle}>
              {quota.quotaTitle}
            </option>
          ))}
        </select>

        <select>
          <option>استان</option>
          {provinces.map((province) => (
            <option key={province.geographyId} value={province.geographyId}>
              {province.geographyName}
            </option>
          ))}
        </select>

        <select>
          <option>دستگاه</option>
          {executiveBodies.map((executiveBody) => (
            <option
              key={executiveBody.executiveBodyId}
              value={executiveBody.executiveBodyId}
            >
              {executiveBody.executiveBodyName}
            </option>
          ))}
        </select>

        <select>
          <option>شغل</option>
          {jobs.map((job) => (
            <option key={job.jobId} value={job.jobId}>
              {job.jobName}
            </option>
          ))}
        </select>

        <select>
          <option>جنسیت</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender.genderName}>
              {gender.genderName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExamAnalysisFilters;
