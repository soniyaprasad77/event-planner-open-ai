import React from "react";

import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className=" mt-auto w-full border border-gray-200  bg-[#23f2dd85] z-50 flex justify-between items-center px-10 py-2 ">
        <div className="container m-3 mx-auto py-4 px-6 flex justify-between items-center">
          <div>
            <p className="text-sm">
              &copy; Try Valley 2024. All rights reserved{" "}
            </p>
          </div>
          <div className="flex gap-2">
            <h1 className="text-sm mr-4 underline">Terms and Conditions</h1>
            <h2 className="text-sm underline">Privacy Policy</h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
