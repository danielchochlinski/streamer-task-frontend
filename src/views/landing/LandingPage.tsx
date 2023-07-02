/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.info}>
          <h1>StreamerHub</h1>
          <p>
            Welcome to StreamerHub, the ultimate platform for streamers and
            viewers alike! Discover a world of captivating live streams and
            engage with your favorite content creators like never before. With
            StreamerHub, the power is in your hands to shape the streaming
            community and support the streamers you love.
          </p>
          <div className={styles.button}>
            <a href="#" onClick={() => navigate("/app")} className={styles.btn}>
              Enter StreamHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
