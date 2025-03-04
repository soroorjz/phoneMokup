import React, { createContext, useContext, useState } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    examId: "",
    religion: "",
    quota: "",
    province: "",
    executiveBody: "",
    job: "",
    gender: "",
  });

  const addReport = (report) => {
    setReports([...reports, report]);
  };

  const updateFilters = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <ReportsContext.Provider
      value={{ reports, addReport, filters, updateFilters }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => useContext(ReportsContext);
