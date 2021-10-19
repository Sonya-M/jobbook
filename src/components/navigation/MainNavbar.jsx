import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import MenuItem from "./MenuItem";
import AuthContext from "../../store/auth-context";
import { MdAdminPanelSettings, MdLogout } from "react-icons/md";

export default function MainNavbar(props) {
  let history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleTitleClick = () => {
    history.push("/");
    window.location.reload();
  };

  const title = <span onClick={handleTitleClick}>JobBook</span>;
  const menu = authCtx.loggedIn
    ? [
        <Link to="/admin">
          <MenuItem icon={<MdAdminPanelSettings />} desc="Admin" />
        </Link>,
        <span onClick={authCtx.onLogout}>
          <MenuItem icon={<MdLogout />} desc="LogOut" />
        </span>,
      ]
    : null;

  return <NavWrapper title={title} menu={menu} />;
}
