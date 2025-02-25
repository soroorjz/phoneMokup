import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import "./MenuComp.scss";
const MenuComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    "روند طراحی آزمون‌ها",
    "تحلیل عملکرد شرکت‌کنندگان",
    "گزارش رضایت‌مندی کاربران",
    "بررسی نیازهای نسل جوان",
    "تجربیات موفق استخدامی",
    "همکاری با شرکت‌ها",
    "خدمات ما به سازمان‌ها",
    "داده‌ها و آمارهای آزمون‌ها",
  ];

  return (
    <div className="menu-container">
      {/* Header */}
      <div className="menu-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <GiHamburgerMenu />}
        </button>
        <h3>نام کاربر</h3>
        <div className="searchBox">
          {/* <input
            type="text"
            placeholder="...جستجو در گزارش"
            className="menu-search-input"
          /> */}
          <button>
            <CiSearch />
          </button>
        </div>
        {/* <div className="logo">
          <img
            src="/assets/images/IMG-20250126-WA0000-removebg-preview.png"
            alt=""
          />
        </div> */}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="menu-dropdown">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">
                <ChevronLeft className="menu-item-icon" /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuComp;
