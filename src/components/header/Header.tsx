import classes from "./Header.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { isDark, toggleThemeHandler } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>{<Link href="/">Logo</Link>}</div>

        <div className={classes["nav-theme-wrapper"]}>
          <div className={classes["theme-control"]}>
            <button onClick={toggleThemeHandler}>
              {isDark ? "Light Theme 🌞" : "Dark Theme 🌙"}
            </button>
          </div>

          <nav className={classes.nav}>
            <ul>
              <li>
                <Link
                  href="/home"
                  className={router.pathname === "/home" ? classes.active : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={router.pathname === "/about" ? classes.active : ""}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
