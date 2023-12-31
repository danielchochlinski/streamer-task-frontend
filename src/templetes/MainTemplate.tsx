import React, { useContext } from "react";
import styles from "./MainTemplate.module.scss";
import Navbar from "../components/navbar/Navbar";
import BasicModal from "../components/modal/Modal";
import Form from "../components/form/Form";
import AppContext from "../context/AppContext";
import Topbar from "../components/topbar/Topbar";

interface TMainTemplate {
  children: React.ReactNode;
}
const MainTemplate = ({ children }: TMainTemplate) => {
  const ctxApp = useContext(AppContext);
  console.log(ctxApp.openNav);
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div
          className={`${styles.inner_container} ${
            ctxApp.openNav ? styles.hide : styles.open
          }`}
        >
          <Topbar />

          {children}
        </div>
      </div>
      <BasicModal openModal={ctxApp.openForm} setOpenModal={ctxApp.setOpenForm}>
        <Form />
      </BasicModal>
    </>
  );
};

export default MainTemplate;
