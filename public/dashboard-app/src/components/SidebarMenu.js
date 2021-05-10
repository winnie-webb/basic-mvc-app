import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import "./css/SidebarMenu.css";
import { IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function SidebarMenu() {
  const iconThemes = {
    large: { fontSize: "3.5rem", color: "white" },
  };
  const username = localStorage.getItem("username");

  async function handleLogout() {
    const logoutRequest = await fetch(`/dashboard/${username}/logout`);
    const isLoggedOut = await logoutRequest.json();
    if (isLoggedOut) window.location.href = "/";
  }
  return (
    <aside className="sidebar">
      <div className="sidebar__logout" style={{ color: "#fff" }}>
        <span onClick={handleLogout}>Logout</span>
      </div>
      <div className="menus-wrapper">
        <NavLink to="/">
          <div className="sidebar__home">
            <IconButton>
              <HomeIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Home</span>
          </div>
        </NavLink>

        <NavLink to="/analytics">
          <div className="sidebar__analytics">
            <IconButton>
              <DashboardIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Analytics</span>
          </div>
        </NavLink>

        <NavLink to="/weighttracker">
          <div className="sidebar__support">
            <IconButton>
              <FitnessCenterIcon style={iconThemes.large} />
            </IconButton>
            <span className="sidebar__icon-title">Weight Log</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}

export default SidebarMenu;
