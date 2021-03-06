import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import MenuItem from "./MenuItem";
import AuthContext from "../../store/auth-context";

import { BsFillHouseFill, BsPlusCircle } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

export default function AdminNavbar(props) {
  let history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleTitleClick = () => {
    history.push("/admin");
    window.location.reload();
  };

  const handleWizardClick = () => {
    history.push("/wizard/0");
    window.location.reload();
  };

  const title = <span onClick={handleTitleClick}>Admin</span>;
  const menu = [
    <Link to="/">
      <MenuItem icon={<BsFillHouseFill />} desc="Home" />
    </Link>,
    <span onClick={handleWizardClick}>
      <MenuItem icon={<BsPlusCircle />} desc="New Report" />
    </span>,
    <span onClick={authCtx.onLogout}>
      <MenuItem icon={<MdLogout />} desc="LogOut" />
    </span>,
  ];

  return <NavWrapper title={title} menu={menu} />;
}
