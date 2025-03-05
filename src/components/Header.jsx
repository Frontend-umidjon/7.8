import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import bilogo from "../assets/bilogo.svg";
import { navbarItems } from "@/static";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Segmented, Select } from "antd";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const Header = () => {
  const [dark, setDark] = useState(localStorage.getItem("dark-mode") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState('middle');

  useEffect(() => {
    if (dark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", dark);
  }, [dark]);

  const handleDarkMode = (value) => {
    setDark(value);
  };

  return (
    <div className="container flex justify-between items-center p-4 relative w-full max-w-7xl mx-auto">
      <NavLink to={"/"} className="text-2xl font-medium flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <img src={bilogo} alt="Bilogo" className="h-8 w-auto" />
      </NavLink>

      <div className="hidden md:flex items-center gap-8">
        {navbarItems?.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-[#A1A1A1]"
              }`
            }
          >
            <div className="flex flex-col gap-[6px] items-center">
              <item.icon className="min-h-6 min-w-6" />
              <p className="font-medium text-[12px]">{item.name}</p>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Select
          defaultValue="EN"
          style={{ width: 120 }}
          className="dark:bg-gray-800 dark:text-white"
          options={[
            { value: "EN", label: "English" },
            { value: "RU", label: "Русский" },
            { value: "UZ", label: "Oʻzbek" },
          ]}
        />
        <Segmented
          value={dark}
          onChange={handleDarkMode}
          size={size}
          shape="round"
          options={[
            {
              value: 'light',
              icon: <SunOutlined />,
            },
            {
              value: 'dark',
              icon: <MoonOutlined />,
            },
          ]}
        />
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex md:hidden text-2xl">
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed top-0 left-0 w-full h-full bg-[#0000006b] dark:bg-[#000000b0] transition-all duration-300 z-50 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col absolute right-0 top-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg md:hidden w-64 p-6 gap-3 transition-all duration-300 h-full"
        >
          {navbarItems?.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className="text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;