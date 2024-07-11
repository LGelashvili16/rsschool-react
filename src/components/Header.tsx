import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <Link to="/home">Logo</Link>
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
    </header>
  );
};

export default Header;
