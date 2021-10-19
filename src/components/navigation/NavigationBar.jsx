import React from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import MainNavbar from "./MainNavbar";

const NavigationBar = () => {
  let { pathname } = useLocation();

  return pathname.includes("admin") || pathname.includes("wizard") ? (
    <AdminNavbar />
  ) : (
    <MainNavbar />
  );
};
export default NavigationBar;
