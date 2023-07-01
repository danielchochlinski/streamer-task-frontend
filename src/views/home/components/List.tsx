import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { IStreamer } from "../../../types/types";
import Card from "./Card";
import styles from "./List.module.scss";
import { Pagination } from "@mui/material";
import AppContext from "../../../context/AppContext";
import Loading from "../../../components/loading/Loading";
import {
  uniqueID,
  useNotification,
} from "../../../context/notifications/NotificationProvider";
const paginationStyle = {
  "& .MuiPaginationItem-root": {
    color: "#000;", // Set the text color for pagination items
  },
};
const List = () => {
  const ctxApp = useContext(AppContext);
  const [data, setData] = useState<IStreamer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const notification = useNotification();
  const getData = useCallback(async () => {
    try {
      ctxApp.setLoadingContext(true);

      const response = await axios.get(
        `${BASE_URL}/streamers?page=${page}&limit=${limit}`
      );
      setData(response.data.streamers);
      setTotalPages(response.data.totalPages);
      ctxApp.setLoadingContext(false);
    } catch (err) {
      notification({
        id: uniqueID(),
        type: "ERROR",
        message: "Ups something went wrong!",
      });
      console.error(err);
    }
  }, [page, limit, ctxApp.forceReload]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className={styles.container}>
      {ctxApp.loading ? (
        <Loading />
      ) : (
        <div className={styles.list_contaner}>
          {data?.map((el: IStreamer, i: number) => (
            <Card streamer={el} i={i} key={`${el.name}+${i}`} />
          ))}
        </div>
      )}
      <Pagination
        sx={paginationStyle}
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="secondary"
      />
    </div>
  );
};

export default List;
