import React, { useState } from "react";
import Form from "./components/Form";
import BasicModal from "../../components/modal/Modal";
import List from "./components/List";
import styles from "./HomeView.module.scss";
const HomeView = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <List />
      <BasicModal openModal={openModal} setOpenModal={setOpenModal}>
        <Form />
      </BasicModal>
    </>
  );
};

export default HomeView;
