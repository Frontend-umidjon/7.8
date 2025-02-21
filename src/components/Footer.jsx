import React from "react";
import logo from "@/assets/logo.svg";
import google from "@/assets/google.svg";
import appstore from "@/assets/appstore.svg";
import { Link } from "react-router-dom";
import { footerCategory, footerInfo } from "@/static";
import {
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookCircleLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div>
      <div className="container bg-[#111111] ">
        <div className=" p-8 flex justify-between flex-wrap flex-col gap-8 sm:flex-row">
          <div className="flex flex-col gap-2">
            <Link
              to={
                "https://bile-tick-2bk1k69vk-muhammadrasuls-projects.vercel.app/"
              }
              target="blank"
              className="mb-12"
            >
              <img src={logo} alt="#" />
            </Link>

            <Link
              to={"https://play.google.com/store/games?hl=en"}
              target="blank"
            >
              <img src={google} alt="" />
            </Link>

            <Link to={"https://www.apple.com/app-store/"} target="blank">
              <img src={appstore} alt="" />
            </Link>
          </div>

          <ul className="flex  gap-4 flex-col">
            <li className="font-medium mb-1">About Us</li>
            {footerInfo?.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 text-white hover:text-primary hover:underline focus:text-primary focus:underline transition duration-200 cursor-pointer"
              >
                <item.icon className="text-primary" />
                {item.title}
              </li>
            ))}
          </ul>

          <ul className="flex  gap-4 flex-col">
            <li className="font-medium mb-1">Category</li>
            {footerCategory?.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 text-white hover:text-primary hover:underline focus:text-primary focus:underline transition duration-200 cursor-pointer"
              >
                <item.icon className="text-primary" />
                {item.title}
              </li>
            ))}
          </ul>

          <div className="flex  flex-col gap-14">
            <div className="flex flex-col gap-5">
              <p className="font-medium">Contact Us</p>
              <p className="font-medium text-xl text-primary">
                +998 (95) 897-33-38
              </p>
            </div>

            <div className="flex flex-col gap-5 text-primary">
              <p className="text-white font-medium">Social Media</p>
              <div className="flex gap-5">
                <RiInstagramLine className="min-w-5 min-h-5 cursor-pointer" />{" "}
                <RiFacebookCircleLine className="min-w-5 min-h-5 cursor-pointer" />{" "}
                <RiYoutubeLine className="min-w-5 min-h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
