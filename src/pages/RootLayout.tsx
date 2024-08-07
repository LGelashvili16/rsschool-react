// import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import Header from "../components/header/Header";
import classes from "./RootLayout.module.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default RootLayout;
