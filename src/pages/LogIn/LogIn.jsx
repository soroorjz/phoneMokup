import React, { useState } from "react";
import "./LogIn.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LootieAnime from "../../Lootie/loginanim.lottie";
const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  const [animationType, setAnimationType] = useState("default");



  const handleLogin = (e) => {
    e.preventDefault();

    const correctUsername = "admin";
    const correctPassword = "123";

    if (username === correctUsername && password === correctPassword) {
      setAnimationType("success");
      setAnimationKey((prevKey) => prevKey + 1);


      
    } else {
      setAnimationType("error");
      setAnimationKey((prevKey) => prevKey + 1);

      setTimeout(() => {
        setAnimationType("default");
      }, 2000); // بازگشت به انیمیشن پیش‌فرض بعد از ۲ ثانیه
    }
  };
  return (
    <div className="logIn">
         <div className="logInContainer">
          <DotLottieReact
            key={animationKey}
            id="loginAnim"
            src={
              animationType === "success"
                ? LootieAnime // انیمیشن موفق
                : animationType === "error"
                ? "https://lottie.host/89138cb4-e80f-4771-ab37-f8749d088e25/Uky1oW3Iz3.lottie" // انیمیشن خطا
                : LootieAnime // انیمیشن پیش‌فرض (لوتی اصلی)
            }
            autoplay={animationType !== "default"} // انیمیشن فقط در صورت موفقیت یا خطا پخش می‌شود
            loop={animationType !== "default"} // انیمیشن فقط یکبار پخش شود
          />
        </div>
      <div className="login-left">
        <h1>ورود به حساب کاربری</h1>
        <form className="login-form">
          <input
            type="text"
            placeholder="نام کاربری"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
