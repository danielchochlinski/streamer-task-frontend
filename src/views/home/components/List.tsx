import React, { useContext } from "react";

import { IStreamer } from "../../../types/types";
import Card from "./Card";
import styles from "./List.module.scss";
import AppContext from "../../../context/AppContext";
import Loading from "../../../components/loading/Loading";

interface IList {
  data: any;
}
const List = ({ data }: IList) => {
  const ctxApp = useContext(AppContext);
  console.log(data);
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
    </div>
  );
};

export default List;
