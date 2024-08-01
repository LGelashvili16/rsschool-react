import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { useEffect } from "react";
import classes from "./RootLayout.module.css";

const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("home");
  }, [navigate, location]);

  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
