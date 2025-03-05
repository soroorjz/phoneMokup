const generateFakeChartData = (filters, chartType) => {
  const { examId, religion, quota, province, executiveBody, job, gender } =
    filters;

  // لیست‌های پایه
  const provinces = [
    { id: "IR-07", name: "تهران", population: 13500000 },
    { id: "IR-04", name: "اصفهان", population: 5120000 },
    { id: "IR-14", name: "فارس", population: 4850000 },
    { id: "IR-30", name: "خراسان رضوي", population: 6430000 },
    { id: "IR-10", name: "خوزستان", population: 4710000 },
    { id: "IR-01", name: "آذربايجان شرقي", population: 3900000 },
    { id: "IR-02", name: "آذربايجان غربي", population: 3260000 },
    { id: "IR-03", name: "اردبيل", population: 1270000 },
    { id: "IR-32", name: "البرز", population: 2710000 },
    { id: "IR-05", name: "ايلام", population: 580000 },
    { id: "IR-06", name: "بوشهر", population: 1160000 },
    { id: "IR-08", name: "چهارمحال و بختياري", population: 947000 },
    { id: "IR-29", name: "خراسان جنوبي", population: 768000 },
    { id: "IR-31", name: "خراسان شمالي", population: 863000 },
    { id: "IR-11", name: "زنجان", population: 1050000 },
    { id: "IR-12", name: "سمنان", population: 702000 },
    { id: "IR-13", name: "سيستان و بلوچستان", population: 2770000 },
    { id: "IR-28", name: "قزوين", population: 1270000 },
    { id: "IR-26", name: "قم", population: 1290000 },
    { id: "IR-16", name: "كردستان", population: 1600000 },
    { id: "IR-15", name: "كرمان", population: 3160000 },
    { id: "IR-17", name: "كرمانشاه", population: 1950000 },
    { id: "IR-18", name: "كهكيلويه و بويراحمد", population: 713000 },
    { id: "IR-27", name: "گلستان", population: 1860000 },
    { id: "IR-19", name: "گيلان", population: 2530000 },
    { id: "IR-20", name: "لرستان", population: 1760000 },
    { id: "IR-21", name: "مازندران", population: 3280000 },
    { id: "IR-22", name: "مركزي", population: 1420000 },
    { id: "IR-23", name: "هرمزگان", population: 1770000 },
    { id: "IR-24", name: "همدان", population: 1730000 },
    { id: "IR-25", name: "يزد", population: 1130000 },
  ];

  const religions = [
    "اسلام(شیعه)",
    "اسلام(زیدی)",
    "اسلام(حنبلی)",
    "اسلام(مالکی)",
    "اسلام(شافعی)",
    "اسلام(حنفی)",
    "زرتشتی",
    "یهودی",
    "مسیحی",
  ];

  const examTitles = [
    "یازدهمین آزمون مشترک دستگاه های اجرایی",
    "آزمون حفاظت فیزیکی(نگهبانی) شرکت کار و تامین",
    "اولین آزمون استخدامی اختصاصی معلولان",
    "سیزدهمین آزمون مشترک",
    "آزمون جذب عمومی تصدی منصب قضا",
    "آزمون استخدامی وزارت بهداشت، درمان و آموزش پزشکی",
    "دوازدهمین آزمون مشترک",
  ];

  const quotas = ["آزاد", "سهمیه3%", "سهمیه5%", "سهمیه25%"];

  const jobs = [
    "کارشناس امور مالیاتی",
    "كارشناس امور بهزيستي",
    "معلم (در آموزش و پرورش)",
    "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)",
    "مهندس برق (در شرکت توانیر یا وزارت نیرو)",
    "پزشک عمومی در مراکز بهداشت دولتی",
    "پرستار در بیمارستان‌های دولتی",
    "نگهبان",
  ];

  const executiveBodies = [
    "وزارت نیرو",
    "شرکت توانیر",
    "وزارت بهداشت، درمان و آموزش پزشکی",
    "سازمان بهزیستی کشور",
    "وزارت آموزش",
    "شهرداری",
  ];

  // تابع کمکی برای تولید دیتای پویا
  const generatePopulationBasedValue = (population, multiplier = 0.0001) =>
    Math.round(population * multiplier * (0.7 + Math.random() * 0.6));

  // سناریو 1: فقط یک دین
  if (religion && !examId && !quota && !province && !job && !gender) {
    if (chartType === "map") {
      return provinces.map((prov) => ({
        id: prov.id,
        name: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(prov.population, 0.005)
            : generatePopulationBasedValue(prov.population, 0.0005),
      }));
    } else if (chartType === "bar") {
      return provinces.map((prov) => ({
        category: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(prov.population, 0.005)
            : generatePopulationBasedValue(prov.population, 0.0005),
      }));
    } else if (chartType === "pie") {
      return [
        { category: "مرد", value: 55 + Math.round(Math.random() * 10) },
        { category: "زن", value: 45 - Math.round(Math.random() * 10) },
      ];
    }
    return [];
  }

  // سناریو 2: دین + عنوان آزمون
  if (religion && examId && !quota && !province && !job && !gender) {
    const isEngineeringExam =
      examId.includes("دستگاه های اجرایی") || examId.includes("سیزدهمین");
    const isMedicalEducationExam =
      examId.includes("بهداشت") || examId.includes("آموزش");

    if (chartType === "map") {
      return provinces.map((prov) => ({
        id: prov.id,
        name: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(
                prov.population,
                isEngineeringExam ? 0.004 : 0.003
              )
            : generatePopulationBasedValue(prov.population, 0.0004),
      }));
    } else if (chartType === "bar") {
      return provinces.map((prov) => ({
        category: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(
                prov.population,
                isEngineeringExam ? 0.004 : 0.003
              )
            : generatePopulationBasedValue(prov.population, 0.0004),
      }));
    } else if (chartType === "pie") {
      return [
        {
          category: "مرد",
          value: isEngineeringExam
            ? 70 + Math.round(Math.random() * 10)
            : 40 + Math.round(Math.random() * 10),
        },
        {
          category: "زن",
          value: isMedicalEducationExam
            ? 60 + Math.round(Math.random() * 10)
            : 30 + Math.round(Math.random() * 10),
        },
      ];
    }
    return [];
  }

  // سناریو 3: دین + استان
  if (religion && province && !examId && !quota && !job && !gender) {
    if (chartType === "bar") {
      return examTitles.map((exam) => ({
        category: exam,
        value: generatePopulationBasedValue(
          provinces.find((p) => p.name === province)?.population || 1000000,
          0.002 + Math.random() * 0.001
        ),
      }));
    } else if (chartType === "pictorial") {
      return executiveBodies.map((body) => ({
        category: body,
        value: Math.round(800 + Math.random() * 1200),
      }));
    }
    return [];
  }

  // سناریو 4: فقط یک سهمیه
  if (quota && !religion && !examId && !province && !job && !gender) {
    if (chartType === "map") {
      return provinces.map((prov) => ({
        id: prov.id,
        name: prov.name,
        value:
          quota === "آزاد"
            ? generatePopulationBasedValue(prov.population, 0.006)
            : generatePopulationBasedValue(
                prov.population,
                0.001 + Math.random() * 0.001
              ),
      }));
    } else if (chartType === "bar") {
      return provinces.map((prov) => ({
        category: prov.name,
        value:
          quota === "آزاد"
            ? generatePopulationBasedValue(prov.population, 0.006)
            : generatePopulationBasedValue(
                prov.population,
                0.001 + Math.random() * 0.001
              ),
      }));
    }
    return [];
  }

  // سناریو 5: سهمیه + استان
  if (quota && province && !religion && !examId && !job && !gender) {
    const provPopulation =
      provinces.find((p) => p.name === province)?.population || 1000000;
    if (chartType === "pie") {
      return [
        { category: "مرد", value: 60 + Math.round(Math.random() * 10) },
        { category: "زن", value: 40 + Math.round(Math.random() * 10) },
      ];
    } else if (chartType === "nestedDonut") {
      return jobs.slice(0, 5).map((job) => ({
        category: job,
        value: generatePopulationBasedValue(
          provPopulation,
          0.0008 + Math.random() * 0.0002
        ),
      }));
    }
    return [];
  }

  // سناریو 6: فقط یک جنسیت
  if (gender && !religion && !examId && !quota && !province && !job) {
    if (chartType === "map") {
      return provinces.map((prov) => ({
        id: prov.id,
        name: prov.name,
        value: generatePopulationBasedValue(
          prov.population,
          gender === "مرد" ? 0.003 : 0.0025
        ),
      }));
    } else if (chartType === "bar") {
      return provinces.map((prov) => ({
        category: prov.name,
        value: generatePopulationBasedValue(
          prov.population,
          gender === "مرد" ? 0.003 : 0.0025
        ),
      }));
    }
    return [];
  }

  // سناریو 7: فقط یک استان
  if (province && !religion && !examId && !quota && !job && !gender) {
    if (chartType === "pie") {
      return quotas.map((q) => ({
        category: q,
        value:
          q === "آزاد"
            ? 50 + Math.round(Math.random() * 10)
            : 15 + Math.round(Math.random() * 5),
      }));
    } else if (chartType === "nestedDonut") {
      return religions.slice(0, 4).map((r) => ({
        category: r,
        value:
          r === "اسلام(شیعه)"
            ? 80 + Math.round(Math.random() * 10)
            : 5 + Math.round(Math.random() * 5),
      }));
    }
    return [];
  }

  // سناریو 8: فقط یک شغل
  if (job && !religion && !examId && !quota && !province && !gender) {
    if (chartType === "map") {
      return provinces.map((prov) => ({
        id: prov.id,
        name: prov.name,
        value: generatePopulationBasedValue(
          prov.population,
          0.001 + Math.random() * 0.0005
        ),
      }));
    } else if (chartType === "nestedDonut") {
      return religions.slice(0, 4).map((r) => ({
        category: r,
        value:
          r === "اسلام(شیعه)"
            ? 85 + Math.round(Math.random() * 10)
            : 5 + Math.round(Math.random() * 5),
      }));
    } else if (chartType === "bar") {
      return [
        {
          category: "مرد",
          value:
            job.includes("مهندس") || job === "نگهبان"
              ? 70 + Math.round(Math.random() * 15)
              : 30 + Math.round(Math.random() * 10),
        },
        {
          category: "زن",
          value:
            job.includes("پرستار") || job === "معلم"
              ? 70 + Math.round(Math.random() * 15)
              : 30 + Math.round(Math.random() * 10),
        },
      ];
    }
    return [];
  }

  // پیش‌فرض
  return [];
};

export default generateFakeChartData;
