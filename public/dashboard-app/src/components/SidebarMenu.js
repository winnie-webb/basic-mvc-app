import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MenuIcon from "@material-ui/icons/Menu";
import "./css/SidebarMenu.css";
import { IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function SidebarMenu(props) {
  const iconThemes = {
    large: { fontSize: "3.5rem", color: "white" },
  };
  return (
    <aside className="sidebar">
      <div className="sidebar__burger">
        <IconButton>
          <MenuIcon
            style={{ fontSize: "4.5rem", color: "white", borderRadius: 10 }}
          />
        </IconButton>
      </div>
      <div className="menus-wrapper">
        <NavLink to="/dashboard">
          <div className="sidebar__home">
            <IconButton>
              <HomeIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Home</span>
          </div>
        </NavLink>

        <NavLink to="/dashboard/analytics">
          <div className="sidebar__analytics">
            <IconButton>
              <DashboardIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Analytics</span>
          </div>
        </NavLink>

        <NavLink to="/dashboard/weighttracker">
          <div className="sidebar__support">
            <IconButton>
              <ContactSupportIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Support</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}

export default SidebarMenu;
