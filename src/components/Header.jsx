import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import bilogo from "../assets/bilogo.svg";
import { navbarItems } from "@/static";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("dark-mode") || "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (dark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", dark);
  }, [dark]);

  const handleDarkMode = () => {
    setDark((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="container flex justify-between items-center p-4 relative">
      <NavLink
        to={"/"}
        className="text-2xl font-medium flex items-center gap-2"
      >
        <img src={logo} alt="Logo" />
        <img src={bilogo} alt="Bilogo" />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
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
        <div className="bg-[#1D1D1D80] rounded-xl">
          <select className="bg-inherit p-2 rounded-xl text-white dark:text-black dark:bg-white">
            <option
              className="bg-white dark:bg-black text-black dark:text-white"
              value=""
            >
              Ru
            </option>
            <option
              className="bg-white dark:bg-black text-black dark:text-white"
              value=""
            >
              Uzb
            </option>
            <option
              className="bg-white dark:bg-black text-black dark:text-white"
              value=""
            >
              Eng
            </option>
          </select>
        </div>

        <button className="cursor-pointer text-2xl" onClick={handleDarkMode}>
          {dark === "light" ? <FaRegMoon /> : <BsSun />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex sm:hidden text-2xl"
        >
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        onClick={() => setMenuOpen(false)}
        className={`absolute top-full w-full h-screen bg-[#0000006b] dark:bg-[#000000b0] transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col absolute right-0 items-center bg-white dark:bg-gray-900 shadow-lg rounded-lg sm:hidden w-52 p-4 gap-3 transition-all duration-300"
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
