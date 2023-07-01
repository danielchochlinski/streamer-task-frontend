import React, { useCallback, useContext, useEffect, useState } from "react";

import List from "./components/List";
import MobileList from "./components/MobileList";
import AppContext from "../../context/AppContext";
import {
  uniqueID,
  useNotification,
} from "../../context/notifications/NotificationProvider";
import { IStreamer } from "../../types/types";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { Pagination } from "@mui/material";
import styles from "./HomeView.module.scss";
const HomeView = () => {
  const ctxApp = useContext(AppContext);
  const [data, setData] = useState<IStreamer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(0);
  const notification = useNotification();
  const getData = useCallback(async () => {
    try {
      if (!ctxApp.dataController) {
        ctxApp.setLoadingContext(true);

        const response = await axios.get(
          `${BASE_URL}/streamers?page=${page}&limit=${limit}`
        );
        setData(response.data.streamers);
        setTotalPages(response.data.totalPages);
        ctxApp.setLoadingContext(false);
      } else {
        ctxApp.setLoadingContext(true);

        const response = await axios.get(`${BASE_URL}/streamers/popular`);
        setData(response.data.popularStreamers);
        ctxApp.setLoadingContext(false);
      }
    } catch (err) {
      notification({
        id: uniqueID(),
        type: "ERROR",
        message: "Ups something went wrong!",
      });
      console.error(err);
    }
  }, [page, limit, ctxApp.forceReload, ctxApp.dataController]); // eslint-disable-line
  const controller = ctxApp.dataController;
  console.log({ data, controller });
  useEffect(() => {
    getData();
  }, [getData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <MobileList data={data} /> : <List data={data} />}
      <div className={styles.pagination}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="secondary"
        />
      </div>
    </>
  );
};

export default HomeView;
