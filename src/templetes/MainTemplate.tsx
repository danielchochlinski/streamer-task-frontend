import React from "react";
import styles from "./MainTemplate.module.scss";
import Navbar from "../components/navbar/Navbar";

interface TMainTemplate {
  children: React.ReactNode;
}
const MainTemplate = ({ children }: TMainTemplate) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
};

export default MainTemplate;
