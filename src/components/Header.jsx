import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import bilogo from "../assets/bilogo.svg";
import { navbarItems } from "@/static";
import { Menu, X } from "lucide-react";
import { Segmented, Select } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const Header = () => {
  const [dark, setDark] = useState(localStorage.getItem("dark-mode") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState(window.innerWidth < 640 ? "small" : "middle");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 640 ? "small" : "middle");
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark === "dark");
    localStorage.setItem("dark-mode", dark);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [dark, menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-black shadow-sm">
      <div className="container flex justify-between items-center py-2 px-3 sm:p-4 max-w-7xl mx-auto">
        <NavLink to="/" className="text-xl sm:text-2xl font-medium flex items-center gap-2">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="h-6 sm:h-8" />
          <img src={bilogo || "/placeholder.svg"} alt="Bilogo" className="h-6 sm:h-8" />
        </NavLink>
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navbarItems.map((item) => (
            <NavLink key={item.id} to={item.path} className={({ isActive }) => `flex items-center gap-1 transition-colors ${isActive ? "text-primary" : "text-[#A1A1A1] hover:text-gray-700 dark:hover:text-gray-300"}`}>
              <div className="flex flex-col gap-1 items-center">
                <item.icon className="min-h-5 min-w-5 lg:min-h-6 lg:min-w-6" />
                <p className="font-medium text-[10px] lg:text-[12px]">{item.name}</p>
              </div>
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          {!isMobile && (
            <><Select defaultValue="EN" style={{ width: 80 }} size={size} className="dark:bg-gray-800 dark:text-white hidden xs:block" options={[{ value: "EN", label: "English" }, { value: "RU", label: "Русский" }, { value: "UZ", label: "Oʻzbek" }]} />
             <Segmented value={dark} onChange={setDark} size={size} shape="round" options={[{ value: "light", icon: <SunOutlined /> }, { value: "dark", icon: <MoonOutlined /> }]} />
            </>
          )}
        
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex md:hidden text-xl p-1 rounded-md hover:bg-gray-100 dark:hover:bg-black transition-colors" aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div onClick={() => setMenuOpen(false)} className={`fixed top-0 left-0 w-full h-full bg-black/60 dark:bg-black/80 transition-all duration-300 z-50 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div onClick={(e) => e.stopPropagation()} className={`flex flex-col absolute right-0 top-0 bg-white dark:bg-black shadow-lg md:hidden w-64 sm:w-80 max-w-[80vw] p-5 gap-3 transition-all duration-300 h-full transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between mb-4 pb-4 border-b dark:border-gray-700">
              <NavLink to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <img src={logo || "/placeholder.svg"} alt="Logo" className="h-7" />
              </NavLink>
              <button onClick={() => setMenuOpen(false)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto">
              {navbarItems.map((item) => (
                <NavLink key={item.id} to={item.path} className={({ isActive }) => `flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`} onClick={() => setMenuOpen(false)}>
                  <item.icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t dark:border-gray-700 flex items-center justify-between">
              <Select defaultValue="EN" style={{ width: 100 }} className="dark:bg-gray-800 dark:text-white" options={[{ value: "EN", label: "English" }, { value: "RU", label: "Русский" }, { value: "UZ", label: "Oʻzbek" }]} />
              <Segmented value={dark} onChange={setDark} size="small" shape="round" options={[{ value: "light", icon: <SunOutlined /> }, { value: "dark", icon: <MoonOutlined /> }]} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;