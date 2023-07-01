import React from "react";
import Streamer from "./components/Streamer";
import styles from "./StreamerView.module.scss";
const StreamerView = () => {
  return (
    <div className={styles.container}>
      <Streamer />
    </div>
  );
};

export default StreamerView;
