const generateFakeChartData = (filters, chartType) => {
  const { examId, religion, quota, province, executiveBody, job, gender } =
    filters;

  const baseCategories = {
    gender: ["مرد", "زن"],
    religion: [
      "اسلام(زیدی)",
      "اسلام(حنبلی)",
      "اسلام(مالکی)",
      "اسلام(شافعی)",
      "اسلام(حنفی)",
      "اسلام(شیعه)",
      "زرتشتی",
      "یهودی",
      "مسیحی",
    ],
    province: ["تهران", "اصفهان", "فارس", "خراسان رضوی", "خوزستان"],
    job: [
      "نگهبان",
      "کارشناس امور اداری",
      "حسابدار دولتی",
      "معلم (در آموزش و پرورش)",
      "پزشک عمومی در مراکز بهداشت دولتی",
      "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)",
    ],
    quota: ["آزاد", "سهمیه3%", "سهمیه5%", "سهمیه25%"],
    executiveBody: [
      "وزارت نیرو",
      "شرکت کار و تامین",
      "وزارت بهداشت، درمان و آموزش پزشکی",
      "سازمان بهزیستی کشور",
      "وزارت آموزش",
      "شرکت توانیر",
      "شهرداری",
    ],
    examId: [
      "یازدهمین آزمون مشترک دستگاه های اجرایی",
      "آزمون حفاظت فیزیکی(نگهبانی) شرکت کار و تامین",
      "اولین آزمون استخدامی اختصاصی معلولان",
      "آزمون استخدامی وزارت بهداشت، درمان و آموزش پزشکی",
      "دوازدهمین آزمون مشترک",
      "آزمون جذب عمومی تصدی منصب قضا",
      "آزمون استخدامی کادر اداری قوه قضاییه",
    ],
  };

  const createData = (categories, values, isPercentage = false) => {
    return categories.map((category, index) => ({
      category: typeof category === "object" ? category.name : category,
      value: values[index] || (isPercentage ? 50 : 1000), // پیش‌فرض درصد یا تعداد
    }));
  };

  // سناریوی پیچیده
  if (
    examId === "یازدهمین آزمون مشترک دستگاه های اجرایی" &&
    gender === "مرد" &&
    province === "تهران" &&
    quota === "سهمیه25%" &&
    job === "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)" &&
    executiveBody === "شهرداری" &&
    religion === "اسلام(شیعه)"
  ) {
    switch (chartType) {
      case "bar":
        return createData(
          baseCategories.job,
          [500, 1000, 1500, 2000, 2500, 7500],
          false
        ); // تعداد (نفر)
      case "pie":
        return createData(baseCategories.gender, [90, 10], true); // درصد
      case "nestedDonut":
        return createData(baseCategories.quota, [10, 5, 5, 80], true); // درصد
      case "line":
        return createData(
          baseCategories.province,
          [8000, 1000, 500, 300, 200],
          false
        ); // تعداد
      case "semiCircle":
        return createData(
          baseCategories.executiveBody.slice(0, 5),
          [500, 1000, 1500, 2000, 5000],
          false
        ); // تعداد
      case "pictorial":
        return createData(
          baseCategories.religion.slice(0, 6),
          [500, 500, 500, 500, 500, 7500],
          false
        ); // تعداد
      default:
        return createData(
          baseCategories.job,
          [500, 1000, 1500, 2000, 2500, 2500],
          false
        ); // تعداد
    }
  }

  // سناریوهای قبلی (برای بقیه حالات)
  if (
    examId === "آزمون حفاظت فیزیکی(نگهبانی) شرکت کار و تامین" &&
    gender === "زن"
  ) {
    return createData(baseCategories.gender, [100, 0], true); // درصد
  } else if (religion === "مسیحی" && province === "اصفهان") {
    return createData(
      baseCategories.religion,
      [10, 5, 5, 5, 5, 10, 5, 5, 60],
      true
    ); // درصد
  } else if (job === "نگهبان" && gender) {
    return createData(
      baseCategories.gender,
      gender === "مرد" ? [90, 10] : [10, 90],
      true
    ); // درصد
  } else if (
    province === "تهران" &&
    executiveBody === "وزارت بهداشت، درمان و آموزش پزشکی"
  ) {
    return createData(
      baseCategories.job.slice(0, 5),
      [1000, 2000, 1500, 1500, 4000],
      false
    ); // تعداد
  } else if (religion === "اسلام(شیعه)" && quota === "سهمیه25%") {
    return createData(
      baseCategories.job.slice(0, 5),
      [2000, 3000, 1500, 2500, 1000],
      false
    ); // تعداد
  } else if (
    gender === "مرد" &&
    job === "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)"
  ) {
    return createData(
      baseCategories.province,
      [4000, 2000, 1500, 1500, 1000],
      false
    ); // تعداد
  } else if (province === "خوزستان" && quota === "سهمیه5%") {
    return createData(
      baseCategories.job.slice(0, 5),
      [3000, 2000, 1000, 2000, 2000],
      false
    ); // تعداد
  } else if (
    examId === "آزمون استخدامی وزارت بهداشت، درمان و آموزش پزشکی" &&
    gender === "زن"
  ) {
    return createData(
      baseCategories.job.slice(0, 5),
      [1000, 1500, 1000, 2500, 4000],
      false
    ); // تعداد
  } else if (
    province === "فارس" &&
    job === "پزشک عمومی در مراکز بهداشت دولتی"
  ) {
    return createData(
      baseCategories.religion.slice(0, 6),
      [8000, 500, 500, 500, 500, 1000],
      false
    ); // تعداد
  } else if (
    executiveBody === "شرکت توانیر" &&
    job === "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)"
  ) {
    return createData(
      baseCategories.province,
      [3000, 2000, 1500, 2500, 1000],
      false
    ); // تعداد
  } else if (
    examId === "اولین آزمون استخدامی اختصاصی معلولان" &&
    quota === "سهمیه3%"
  ) {
    return createData(
      baseCategories.job.slice(0, 5),
      [2000, 3000, 1500, 2000, 1500],
      false
    ); // تعداد
  } else if (
    examId === "یازدهمین آزمون مشترک دستگاه های اجرایی" &&
    gender === "مرد"
  ) {
    return createData(
      baseCategories.job,
      [4000, 2000, 1500, 1000, 1000, 500],
      false
    ); // تعداد
  } else if (religion === "اسلام(شیعه)" && province === "خوزستان") {
    return createData(
      baseCategories.job,
      [3000, 2500, 2000, 1500, 500, 500],
      false
    ); // تعداد
  } else if (
    job === "پزشک عمومی در مراکز بهداشت دولتی" &&
    executiveBody === "وزارت بهداشت، درمان و آموزش پزشکی"
  ) {
    return createData(baseCategories.gender, [30, 70], true); // درصد
  } else if (quota === "سهمیه25%" && province === "تهران") {
    return createData(
      baseCategories.job,
      [2000, 1500, 1000, 3500, 1500, 500],
      false
    ); // تعداد
  } else if (examId === "آزمون جذب عمومی تصدی منصب قضا" && gender === "زن") {
    return createData(
      baseCategories.province,
      [5000, 1500, 1000, 1500, 1000],
      false
    ); // تعداد
  } else if (
    executiveBody === "شرکت توانیر" &&
    job === "مهندس عمران (در شهرداری‌ها و وزارت راه و شهرسازی)"
  ) {
    return createData(baseCategories.gender, [70, 30], true); // درصد

    // سناریوی عمومی
  } else {
    let categories = province ? [province] : baseCategories.province;
    let values = province ? [5000] : [3000, 2500, 2000, 1500, 1000];
    let isPercentage =
      chartType === "pie" ||
      chartType === "semiCircle" ||
      chartType === "nestedDonut";

    if (gender) values = values.map((v) => (isPercentage ? v * 0.9 : v + 1000)); // تنظیم برای مردها
    if (religion) categories = baseCategories.religion.slice(0, 6);
    if (job) categories = [job];
    if (executiveBody)
      values = values.map((v) => (isPercentage ? v * 1.1 : v + 500));
    if (quota) values = values.map((v) => (isPercentage ? v * 1.2 : v + 1000));
    if (examId)
      values = values.map((v) => (isPercentage ? v * 0.95 : v + 1500));

    values = values.map((v) =>
      isPercentage
        ? Math.round(v * (0.8 + Math.random() * 0.4))
        : Math.round(v * (0.8 + Math.random() * 0.4))
    );
    return createData(categories, values, isPercentage);
  }
};

export default generateFakeChartData;
