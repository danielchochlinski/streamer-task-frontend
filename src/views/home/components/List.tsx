import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { IStreamer } from "../../../types/types";
import Card from "./Card";
import styles from "./List.module.scss";
import { Pagination } from "@mui/material";
import Topbar from "../../../components/topbar/Topbar";
const List = () => {
  const [data, setData] = useState<IStreamer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/streamers?page=${page}&limit=${limit}`
      );
      setData(response.data.streamers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [page, limit]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.list_contaner}>
        {data?.map((el: IStreamer, i: number) => (
          <Card streamer={el} i={i} key={`${el.name}+${i}`} />
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </div>
  );
};

export default List;
