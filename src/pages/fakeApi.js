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

  // تابع کمکی برای تولید دیتا بر اساس جمعیت
  const generatePopulationBasedValue = (population, multiplier = 0.0001) =>
    Math.round(population * multiplier * (0.5 + Math.random() * 1.0));

  // تابع تعیین رنگ بر اساس رنج مقدار
  const getColorByValue = (value) => {
    if (value > 50000) return "#dc8c67";
    if (value > 25000) return "#dc6788";
    if (value > 10000) return "#a367dc";
    if (value > 5000) return "#8067dc";
    if (value > 1000) return "#6771dc";
    return "#67b7dc";
  };

  // تابع پیدا کردن اسم استان
  const getProvinceName = (provinceValue) => {
    console.log(
      "Province value received:",
      provinceValue,
      "Type:",
      typeof provinceValue
    );
    if (!provinceValue) {
      console.log("No province value provided");
      return "استان نامشخص";
    }
    let prov = provinces.find((p) => p.id === provinceValue);
    if (!prov) {
      prov = provinces.find((p) => p.name === provinceValue);
    }
    console.log("Found province:", prov);
    return prov ? prov.name : "استان نامشخص";
  };

  // تابع تولید توضیح داینامیک
  const generateDescription = () => {
    let desc = "";
    const provinceName = province ? getProvinceName(province) : null;
    console.log("Filters:", filters);
    console.log("Province Name:", provinceName);
    if (religion && !examId && !quota && !province && !job && !gender) {
      desc =
        chartType === "nestedDonut"
          ? `قبولی‌های زن و مرد دین ${religion} در آزمون‌های مختلف`
          : chartType === "stacked"
          ? `درصد قبولی دین ${religion} در سهمیه‌های مختلف`
          : `تعداد قبولی‌های دین ${religion} در استان‌های مختلف`; // برای map و bar قدیمی
    } else if (religion && examId && !quota && !province && !job && !gender) {
      desc =
        chartType === "line"
          ? `پراکندگی قبولی‌های دین ${religion} در آزمون ${examId} در استان‌ها`
          : chartType === "nestedDonut"
          ? `ترکیب سهمیه‌ها و جنسیت برای دین ${religion} در آزمون ${examId}`
          : `تعداد قبولی‌های دین ${religion} در آزمون ${examId} در کشور`; // برای map و bar قدیمی
    } else if (religion && province && !examId && !quota && !job && !gender) {
      desc =
        chartType === "line"
          ? `تعداد قبولی‌های دین ${religion} در آزمون‌های مختلف در ${provinceName}`
          : chartType === "bar"
          ? `تعداد شغل‌های درخواستی از دستگاه‌ها برای دین ${religion} در ${provinceName}`
          : chartType === "nestedDonut"
          ? `درخواست شغل‌ها برای جنسیت‌ها در دین ${religion} در ${provinceName}`
          : chartType === "pie"
          ? `تعداد شغل‌های درخواستی هر دستگاه برای دین ${religion} در ${provinceName}`
          : `تعداد شغل‌های درخواستی از دستگاه‌ها برای دین ${religion} در ${provinceName}`; // برای pictorial قدیمی
    } else if (quota && !religion && !examId && !province && !job && !gender) {
      desc =
        chartType === "pie"
          ? `قبولی‌های ${quota} بر اساس جنسیت`
          : chartType === "semiCircle"
          ? `درصد قبولی ${quota} نسبت به کل ظرفیت‌ها`
          : chartType === "line"
          ? `قبولی‌های ${quota} در آزمون‌های مختلف`
          : `تعداد قبولی‌های ${quota} در کل کشور`; // برای map و bar قدیمی
    } else if (quota && province && !religion && !examId && !job && !gender) {
      desc =
        chartType === "line"
          ? `روند قبولی‌های ${quota} در آزمون‌های مختلف در ${provinceName}`
          : chartType === "bar"
          ? `تعداد شغل‌های موجود برای ${quota} در ${provinceName}`
          : chartType === "stacked"
          ? `قبولی‌های ${quota} با تفکیک دین‌ها در ${provinceName}`
          : `نسبت قبولی زن به مرد ${quota} در ${provinceName}`; // برای pie قدیمی
    } else if (gender && !religion && !examId && !quota && !province && !job) {
      desc =
        chartType === "line"
          ? `تعداد قبولی‌های جنسیت ${gender} در آزمون‌های مختلف`
          : chartType === "nestedDonut"
          ? `توزیع قبولی‌های جنسیت ${gender} بر اساس دین و شغل‌ها`
          : `تعداد قبولی‌های جنسیت ${gender} در کل کشور`; // برای map و bar قدیمی
    } else if (province && !religion && !examId && !quota && !job && !gender) {
      desc =
        chartType === "line"
          ? `پراکندگی شغل‌ها در دین‌ها در ${provinceName}`
          : chartType === "bar"
          ? `ظرفیت‌های شغلی در ${provinceName}`
          : chartType === "pie"
          ? `نسبت قبولی‌ها بر اساس سهمیه‌ها در ${provinceName}`
          : chartType === "semiCircle"
          ? `درصد قبولی‌های موفق در ${provinceName}`
          : chartType === "nestedDonut"
          ? `توزیع قبولی‌ها بر اساس جنسیت و دین در ${provinceName}`
          : `نسبت قبولی‌ها با دین‌های مختلف در ${provinceName}`; // برای nestedDonut قدیمی
    } else if (job && !religion && !examId && !quota && !province && !gender) {
      desc =
        chartType === "pie"
          ? `نسبت ظرفیت درخواستی شغل ${job} برای زن و مرد`
          : chartType === "stacked"
          ? `ظرفیت شغل ${job} در استان‌های کلیدی`
          : chartType === "semiCircle"
          ? `درصد ظرفیت درخواستی شغل ${job} نسبت به کل ظرفیت`
          : chartType === "map"
          ? `تعداد ظرفیت‌های درخواستی شغل ${job} در هر استان`
          : `نسبت ظرفیت‌های درخواستی شغل ${job} برای هر دین`; // برای nestedDonut و bar قدیمی
    }
    return desc || "داده‌ای برای نمایش وجود ندارد";
  };

  // سناریو 1: فقط یک دین انتخاب شده
  if (religion && !examId && !quota && !province && !job && !gender) {
    // قبولی‌های زن و مرد اون دین در آزمون‌های مختلف (دونات تو در تو)
    if (chartType === "nestedDonut") {
      // حلقه بیرونی: جنسیت، حلقه درونی: آزمون‌ها
      const data = [
        {
          category: "مرد",
          value: 55, // فرض بر برتری نسبی مردها در کل قبولی‌ها
          children: examTitles.slice(0, 5).map((exam) => ({
            category: exam,
            value: Math.round(20 + Math.random() * 10), // اعداد منطقی و تصادفی برای هر آزمون
          })),
        },
        {
          category: "زن",
          value: 45, // زن‌ها کمی کمتر از مردها
          children: examTitles.slice(0, 5).map((exam) => ({
            category: exam,
            value: Math.round(15 + Math.random() * 8), // اعداد کمی کمتر برای زن‌ها
          })),
        },
      ];
      return { data, description: generateDescription() };
    }
    // درصد قبولی هر دین در سهمیه‌های مختلف (انباشته)
    else if (chartType === "stacked") {
      // توزیع سهمیه‌ها بر اساس اولویت: شیعه > سایر اسلام > مسیحی > زرتشتی > یهودی
      const quotaDistribution = {
        "اسلام(شیعه)": {
          آزاد: 20,
          "سهمیه3%": 25,
          "سهمیه5%": 25,
          "سهمیه25%": 30,
        }, // شیعه سهمیه‌های درصدی بیشتر
        "اسلام(زیدی)": {
          آزاد: 50,
          "سهمیه3%": 20,
          "سهمیه5%": 20,
          "سهمیه25%": 10,
        },
        "اسلام(حنبلی)": {
          آزاد: 55,
          "سهمیه3%": 20,
          "سهمیه5%": 15,
          "سهمیه25%": 10,
        },
        "اسلام(مالکی)": {
          آزاد: 60,
          "سهمیه3%": 15,
          "سهمیه5%": 15,
          "سهمیه25%": 10,
        },
        "اسلام(شافعی)": {
          آزاد: 65,
          "سهمیه3%": 15,
          "سهمیه5%": 10,
          "سهمیه25%": 10,
        },
        "اسلام(حنفی)": {
          آزاد: 70,
          "سهمیه3%": 10,
          "سهمیه5%": 10,
          "سهمیه25%": 10,
        },
        مسیحی: { آزاد: 80, "سهمیه3%": 10, "سهمیه5%": 5, "سهمیه25%": 5 },
        زرتشتی: { آزاد: 85, "سهمیه3%": 5, "سهمیه5%": 5, "سهمیه25%": 5 },
        یهودی: { آزاد: 90, "سهمیه3%": 5, "سهمیه5%": 3, "سهمیه25%": 2 }, // یهودی سهمیه آزاد غالب
      };
      const data = quotas.map((q) => ({
        category: q,
        value: quotaDistribution[religion][q],
      }));
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی (map و bar)
    else if (chartType === "map") {
      const data = provinces.map((prov) => {
        const value =
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(prov.population, 0.005)
            : generatePopulationBasedValue(prov.population, 0.0005);
        return {
          id: prov.id,
          name: prov.name,
          value,
          fill: getColorByValue(value),
        };
      });
      return { data, description: generateDescription() };
    } else if (chartType === "bar") {
      const data = provinces.map((prov) => ({
        category: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(prov.population, 0.005)
            : generatePopulationBasedValue(prov.population, 0.0005),
      }));
      return { data, description: generateDescription() };
    } else if (chartType === "pie") {
      const data = [
        { category: "مرد", value: 55 + Math.round(Math.random() * 10) },
        { category: "زن", value: 45 - Math.round(Math.random() * 10) },
      ];
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 2: یک دین + یک عنوان آزمون انتخاب شده
  if (religion && examId && !quota && !province && !job && !gender) {
    // پراکندگی قبولی‌ها در استان‌ها (خطی)
    if (chartType === "line") {
      const data = provinces.slice(0, 10).map((prov) => ({
        category: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(prov.population, 0.003) // شیعه قبولی بیشتری داره
            : generatePopulationBasedValue(prov.population, 0.0003), // سایر ادیان کمتر
      }));
      return { data, description: generateDescription() };
    }
    // ترکیب سهمیه‌ها و جنسیت (دونات تو در تو)
    else if (chartType === "nestedDonut") {
      const data = [
        {
          category: "سهمیه‌ها",
          value: 100,
          children: [
            { category: "آزاد", value: 20 },
            { category: "سهمیه3%", value: 15 },
            { category: "سهمیه5%", value: 25 },
            { category: "سهمیه25%", value: 40 }, // فرض بر سهمیه بالا برای شیعه
          ],
        },
        {
          category: "جنسیت",
          value: 100,
          children: [
            { category: "مرد", value: 70 }, // مردها غالب‌تر در اکثر آزمون‌ها
            { category: "زن", value: 30 },
          ],
        },
      ];
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    const isEngineeringExam =
      examId.includes("دستگاه های اجرایی") || examId.includes("سیزدهمین");
    const isMedicalEducationExam =
      examId.includes("بهداشت") || examId.includes("آموزش");
    if (chartType === "map") {
      const data = provinces.map((prov) => {
        const value =
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(
                prov.population,
                isEngineeringExam ? 0.004 : 0.003
              )
            : generatePopulationBasedValue(prov.population, 0.0004);
        return {
          id: prov.id,
          name: prov.name,
          value,
          fill: getColorByValue(value),
        };
      });
      return { data, description: generateDescription() };
    } else if (chartType === "bar") {
      const data = provinces.map((prov) => ({
        category: prov.name,
        value:
          religion === "اسلام(شیعه)"
            ? generatePopulationBasedValue(
                prov.population,
                isEngineeringExam ? 0.004 : 0.003
              )
            : generatePopulationBasedValue(prov.population, 0.0004),
      }));
      return { data, description: generateDescription() };
    } else if (chartType === "pie") {
      const data = [
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
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 3: دین + یک استان انتخاب شده
  if (religion && province && !examId && !quota && !job && !gender) {
    const provPopulation =
      provinces.find((p) => p.id === province || p.name === province)
        ?.population || 1000000;
    // تعداد قبولی‌ها در آزمون‌های مختلف (خطی)
    if (chartType === "line") {
      const data = examTitles.map((exam) => ({
        category: exam,
        value: generatePopulationBasedValue(
          provPopulation,
          religion === "اسلام(شیعه)" ? 0.002 : 0.0005 // شیعه قبولی بیشتری داره
        ),
      }));
      return { data, description: generateDescription() };
    }
    // تعداد شغل‌های پیشنهادی از هر دستگاه (میله‌ای)
    else if (chartType === "bar") {
      const data = executiveBodies.map((body) => ({
        category: body,
        value: Math.round(5 + Math.random() * 10), // اعداد کم و منطقی برای هر دستگاه
      }));
      return { data, description: generateDescription() };
    }
    // درخواست برای شغل‌های مختلف در هر جنسیت (دونات تو در تو)
    else if (chartType === "nestedDonut") {
      const data = [
        {
          category: "مرد",
          value: 60, // مردها غالب‌تر فرض شدن
          children: [
            { category: "مهندس عمران", value: 25 }, // شغل‌های فنی برای مردها
            { category: "نگهبان", value: 20 },
            { category: "کارشناس مالیاتی", value: 15 },
          ],
        },
        {
          category: "زن",
          value: 40,
          children: [
            { category: "معلم", value: 20 }, // شغل‌های آموزشی و بهداشتی برای زن‌ها
            { category: "پرستار", value: 15 },
            { category: "پزشک عمومی", value: 5 },
          ],
        },
      ];
      return { data, description: generateDescription() };
    }
    // هر دستگاه چند شغل ارائه داده (دایره‌ای)
    else if (chartType === "pie") {
      const data = executiveBodies.map((body, index) => ({
        category: body,
        value: [3, 2, 2, 1, 1, 1][index], // اعداد خیلی کم و منطقی
      }));
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    else if (chartType === "pictorial") {
      const data = executiveBodies.map((body) => ({
        category: body,
        value: Math.round(800 + Math.random() * 1200),
      }));
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 4: فقط یک سهمیه انتخاب شده
  if (quota && !religion && !examId && !province && !job && !gender) {
    // قبولی‌های این سهمیه بر اساس جنسیت (دایره‌ای)
    if (chartType === "pie") {
      const data =
        quota === "آزاد"
          ? [
              { category: "مرد", value: 45 },
              { category: "زن", value: 55 }, // زن‌ها در سهمیه آزاد بیشتر
            ]
          : [
              { category: "مرد", value: quota === "سهمیه25%" ? 70 : 60 },
              { category: "زن", value: quota === "سهمیه25%" ? 30 : 40 },
            ];
      return { data, description: generateDescription() };
    }
    // درصد قبولی این سهمیه نسبت به کل ظرفیت‌ها (نیم‌دایره‌ای)
    else if (chartType === "semiCircle") {
      const totalCapacity = 100;
      const quotaPercentage =
        quota === "آزاد"
          ? 70
          : quota === "سهمیه3%"
          ? 3
          : quota === "سهمیه5%"
          ? 5
          : 25;
      const data = [
        { category: quota, value: quotaPercentage },
        { category: "سایر", value: 100 - quotaPercentage },
      ];
      return { data, description: generateDescription() };
    }
    // قبولی‌های این سهمیه تو چند آزمون مختلف (خطی)
    else if (chartType === "line") {
      const data = examTitles.map((exam) => ({
        category: exam,
        value:
          quota === "آزاد"
            ? Math.round(100 + Math.random() * 50)
            : Math.round(20 + Math.random() * 30),
      }));
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    else if (chartType === "map") {
      const data = provinces.map((prov) => {
        const value =
          quota === "آزاد"
            ? generatePopulationBasedValue(prov.population, 0.006)
            : generatePopulationBasedValue(
                prov.population,
                0.001 + Math.random() * 0.001
              );
        return {
          id: prov.id,
          name: prov.name,
          value,
          fill: getColorByValue(value),
        };
      });
      return { data, description: generateDescription() };
    } else if (chartType === "bar") {
      const data = provinces.map((prov) => ({
        category: prov.name,
        value:
          quota === "آزاد"
            ? generatePopulationBasedValue(prov.population, 0.006)
            : generatePopulationBasedValue(
                prov.population,
                0.001 + Math.random() * 0.001
              ),
      }));
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 5: سهمیه + استان انتخاب شده
  if (quota && province && !religion && !examId && !job && !gender) {
    const provPopulation =
      provinces.find((p) => p.id === province || p.name === province)
        ?.population || 1000000;
    // روند تعداد قبولی‌ها در آزمون‌های مختلف (خطی)
    if (chartType === "line") {
      const data = examTitles.map((exam) => ({
        category: exam,
        value: generatePopulationBasedValue(
          provPopulation,
          quota === "آزاد" ? 0.002 : 0.0005
        ),
      }));
      return { data, description: generateDescription() };
    }
    // تعداد شغل‌های موجود (میله‌ای)
    else if (chartType === "bar") {
      const data = jobs.map((job) => ({
        category: job,
        value: generatePopulationBasedValue(
          provPopulation,
          quota === "آزاد" ? 0.0005 : 0.0002
        ),
      }));
      return { data, description: generateDescription() };
    }
    // تعداد قبولی‌ها با تفکیک دین‌ها (انباشته)
    else if (chartType === "stacked") {
      const data = religions.slice(0, 4).map((r) => ({
        category: r,
        value: r === "اسلام(شیعه)" ? 70 : 10 + Math.round(Math.random() * 10), // شیعه غالب
      }));
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    else if (chartType === "pie") {
      const data = [
        { category: "مرد", value: 60 },
        { category: "زن", value: 40 },
      ];
      return { data, description: generateDescription() };
    } else if (chartType === "nestedDonut") {
      const data = jobs.slice(0, 5).map((job) => ({
        category: job,
        value: generatePopulationBasedValue(
          provPopulation,
          0.0008 + Math.random() * 0.0002
        ),
      }));
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 6: فقط یک جنسیت انتخاب شده
  if (gender && !religion && !examId && !quota && !province && !job) {
    // تعداد قبولی‌ها در آزمون‌های مختلف (خطی)
    if (chartType === "line") {
      const data = examTitles.map((exam) => ({
        category: exam,
        value:
          gender === "مرد"
            ? Math.round(100 + Math.random() * 50)
            : Math.round(80 + Math.random() * 40),
      }));
      return { data, description: generateDescription() };
    }
    // توزیع قبولی‌ها بر اساس دین و شغل (دونات تو در تو)
    else if (chartType === "nestedDonut") {
      const data = [
        {
          category: "دین",
          value: 100,
          children: religions.slice(0, 4).map((r) => ({
            category: r,
            value: r === "اسلام(شیعه)" ? 80 : 20 / 3,
          })),
        },
        {
          category: "شغل",
          value: 100,
          children: jobs.slice(0, 4).map((j) => ({
            category: j, // اسم شغل به جای ID
            value:
              gender === "مرد" && j.includes("مهندس")
                ? 40
                : gender === "زن" &&
                  (j.includes("معلم") || j.includes("پرستار"))
                ? 35
                : 25 / 2,
          })),
        },
      ];
      return { data, description: generateDescription() };
    } else if (chartType === "pie") {
      const data = [
        { category: "آزاد", value: gender === "مرد" ? 40 : 50 },
        { category: "سهمیه3%", value: gender === "مرد" ? 20 : 15 },
        { category: "سهمیه5%", value: gender === "مرد" ? 20 : 15 },
        { category: "سهمیه25%", value: gender === "مرد" ? 20 : 20 }, // جمع 100
      ];
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    else if (chartType === "map") {
      const data = provinces.map((prov) => {
        const value = generatePopulationBasedValue(
          prov.population,
          gender === "مرد" ? 0.003 : 0.0025
        );
        return {
          id: prov.id,
          name: prov.name,
          value,
          fill: getColorByValue(value),
        };
      });
      return { data, description: generateDescription() };
    } else if (chartType === "bar") {
      const data = provinces.map((prov) => ({
        category: prov.name,
        value: generatePopulationBasedValue(
          prov.population,
          gender === "مرد" ? 0.003 : 0.0025
        ),
      }));
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 7: فقط یک استان انتخاب شده
  if (province && !religion && !examId && !quota && !job && !gender) {
    const provPopulation =
      provinces.find((p) => p.id === province || p.name === province)
        ?.population || 1000000;
    // پراکندگی شغل در هر دین (خطی)
    if (chartType === "line") {
      const data = religions.slice(0, 5).map((r) => ({
        category: r,
        value: generatePopulationBasedValue(
          provPopulation,
          r === "اسلام(شیعه)" ? 0.001 : 0.0002
        ),
      }));
      return { data, description: generateDescription() };
    }
    // ظرفیت‌های شغلی (میله‌ای)
    else if (chartType === "bar") {
      const data = jobs.slice(0, 5).map((job) => ({
        category: job,
        value: generatePopulationBasedValue(provPopulation, 0.0003), // منطقی با جمعیت استان
      }));
      return { data, description: generateDescription() };
    }
    // نسبت قبولی‌ها بر اساس سهمیه‌ها (دایره‌ای)
    else if (chartType === "pie") {
      const data = [
        { category: "آزاد", value: 60 },
        { category: "سهمیه3%", value: 10 },
        { category: "سهمیه5%", value: 15 },
        { category: "سهمیه25%", value: 15 },
      ];
      return { data, description: generateDescription() };
    }
    // درصد قبولی‌های موفق نسبت به کل داوطلبان (نیم‌دایره‌ای)
    else if (chartType === "semiCircle") {
      const totalApplicants = generatePopulationBasedValue(
        provPopulation,
        0.01
      );
      const data = [
        { category: "قبول‌شده", value: totalApplicants * 0.3 }, // 30% قبولی فرض شده
        { category: "ناموفق", value: totalApplicants * 0.7 },
      ];
      return { data, description: generateDescription() };
    }
    // توزیع قبولی‌ها بر اساس جنسیت و دین (دونات تو در تو)
    else if (chartType === "nestedDonut") {
      const data = [
        {
          category: "مرد",
          value: 55,
          children: religions.slice(0, 4).map((r) => ({
            category: r,
            value: r === "اسلام(شیعه)" ? 40 : 5, // شیعه غالب
          })),
        },
        {
          category: "زن",
          value: 45,
          children: religions.slice(0, 4).map((r) => ({
            category: r,
            value: r === "اسلام(شیعه)" ? 35 : 3,
          })),
        },
      ];
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // سناریو 8: فقط یک شغل انتخاب شده
  if (job && !religion && !examId && !quota && !province && !gender) {
    // نسبت ظرفیت درخواستی برای زن و مرد (دایره‌ای)
    if (chartType === "pie") {
      const data =
        job.includes("پرستار") || job.includes("معلم")
          ? [
              { category: "مرد", value: 30 },
              { category: "زن", value: 70 }, // زن‌ها در این شغل‌ها غالب
            ]
          : [
              { category: "مرد", value: 65 }, // مردها در شغل‌های فنی غالب
              { category: "زن", value: 35 },
            ];
      return { data, description: generateDescription() };
    }
    // ظرفیت این شغل در چند استان کلیدی (انباشته)
    else if (chartType === "stacked") {
      const data = provinces.slice(0, 4).map((prov) => ({
        category: prov.name,
        value: generatePopulationBasedValue(prov.population, 0.0005), // منطقی با جمعیت
      }));
      return { data, description: generateDescription() };
    }
    // درصد ظرفیت پرشده این شغل (نیم‌دایره‌ای)
    else if (chartType === "semiCircle") {
      const totalCapacity = 100;
      const data = [
        { category: "پرشده", value: 80 },
        { category: "خالی", value: 20 }, // جمع 100
      ];
      return { data, description: generateDescription() };
    }
    // سناریوهای قدیمی
    else if (chartType === "map") {
      const data = provinces.map((prov) => {
        const value = generatePopulationBasedValue(
          prov.population,
          0.001 + Math.random() * 0.0005
        );
        return {
          id: prov.id,
          name: prov.name,
          value,
          fill: getColorByValue(value),
        };
      });
      return { data, description: generateDescription() };
    } else if (chartType === "nestedDonut") {
      const data = religions.slice(0, 4).map((r) => ({
        category: r,
        value: r === "اسلام(شیعه)" ? 85 : 5,
      }));
      return { data, description: generateDescription() };
    } else if (chartType === "bar") {
      const data = [
        {
          category: "مرد",
          value: job.includes("مهندس") || job === "نگهبان" ? 65 : 35,
        },
        {
          category: "زن",
          value: job.includes("پرستار") || job === "معلم" ? 65 : 35,
        },
      ];
      return { data, description: generateDescription() };
    }
    return { data: [], description: generateDescription() };
  }

  // پیش‌فرض در صورت عدم تطابق
  return { data: [], description: generateDescription() };
};

export default generateFakeChartData;
