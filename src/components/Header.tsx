import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { isDark, toggleThemeHandler } = useContext(ThemeContext);

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <Link to="/home">Logo</Link>
        </div>

        <div className={classes["nav-theme-wrapper"]}>
          <div className={classes["theme-control"]}>
            <button onClick={toggleThemeHandler}>
              {isDark ? "Light Theme 🌞" : "Dark Theme 🌙"}
            </button>
          </div>

          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
