import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ExamAnalysisFilters = () => {
  const [examTitles, setExamTitles] = useState([]);
  const [religions, setReligions] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [genders, setGenders] = useState([]);

  const [error, setError] = useState(null);

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

      localStorage.setItem("RayanToken", response.data.token);
      return response.data.token;
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("خطا در دریافت توکن!");
      return null;
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      let token = localStorage.getItem("RayanToken");
      if (!token) {
        token = await fetchToken();
        if (!token) return;
      }

      // چک کردن کش
      const cachedExamTitles = localStorage.getItem("ExamTitles");
      const cachedReligions = localStorage.getItem("Religions");
      const cachedQuotas = localStorage.getItem("Quotas");
      const cachedJobs = localStorage.getItem("Jobs");
      const cachedProvinces = localStorage.getItem("Provinces");
      const cachedGenders = localStorage.getItem("Genders");
      const cachedExamTimes = localStorage.getItem("ExamTimes");
      const cachedTestExecutors = localStorage.getItem("TestExecutors");

      if (
        cachedExamTitles &&
        cachedReligions &&
        cachedQuotas &&
        cachedJobs &&
        cachedProvinces &&
        cachedGenders &&
        cachedExamTimes &&
        cachedTestExecutors
      ) {
        console.log("داده‌ها از کش خوانده شدند");
        setExamTitles(JSON.parse(cachedExamTitles));
        setReligions(JSON.parse(cachedReligions));
        setQuotas(JSON.parse(cachedQuotas));
        setJobs(JSON.parse(cachedJobs));
        setProvinces(JSON.parse(cachedProvinces));
        setGenders(JSON.parse(cachedGenders));

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
        examTimesResponse,
        testExecutorsResponse,
      ] = await Promise.all([
        axios.get("/api/exam/exams", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/religion/religions", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/quota/quotas", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/job/jobs", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/geography/geographies", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/gender/genders", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
        axios.get("/api/exam/examTimes", {
          headers: { "RAYAN-TOKEN": token, "RAYAN-DEBUG": true },
        }),
      ]);

      // بررسی وضعیت پاسخ‌ها
      if (
        examTitlesResponse.status !== 200 ||
        religionsResponse.status !== 200 ||
        quotasResponse.status !== 200 ||
        jobsResponse.status !== 200 ||
        provincesResponse.status !== 200 ||
        gendersResponse.status !== 200 ||
        examTimesResponse.status !== 200 ||
        testExecutorsResponse.status !== 200
      ) {
        throw new Error("خطا در دریافت داده‌ها!");
      }

      // ذخیره داده‌ها در state
      setExamTitles(examTitlesResponse.data);
      setReligions(religionsResponse.data);
      setQuotas(quotasResponse.data);
      setJobs(jobsResponse.data);
      setProvinces(provincesResponse.data);
      setGenders(gendersResponse.data);

      // ذخیره داده‌ها در localStorage
      localStorage.setItem(
        "ExamTitles",
        JSON.stringify(examTitlesResponse.data)
      );
      localStorage.setItem("Religions", JSON.stringify(religionsResponse.data));
      localStorage.setItem("Quotas", JSON.stringify(quotasResponse.data));
      localStorage.setItem("Jobs", JSON.stringify(jobsResponse.data));
      localStorage.setItem("Provinces", JSON.stringify(provincesResponse.data));
      localStorage.setItem("Genders", JSON.stringify(gendersResponse.data));
      localStorage.setItem("ExamTimes", JSON.stringify(examTimesResponse.data));
      localStorage.setItem(
        "TestExecutors",
        JSON.stringify(testExecutorsResponse.data)
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("خطا در دریافت داده‌ها!");
    } finally {
    }
  }, [fetchToken]);

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