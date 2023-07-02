import React, { useContext } from "react";

import { IStreamer } from "../../../types/types";
import Card from "./Card";
import styles from "./List.module.scss";
import AppContext from "../../../context/AppContext";
import Loading from "../../../components/loading/Loading";
import { motion, AnimatePresence } from "framer-motion";
interface IList {
  data: any;
}
const List = ({ data }: IList) => {
  const ctxApp = useContext(AppContext);
  console.log(data);
  return (
    <div className={styles.container}>
      {/* {ctxApp.loading ? (
        <Loading />
      ) : ( */}
      <motion.div layout className={styles.list_contaner}>
        <AnimatePresence>
          {data?.map((el: IStreamer, i: number) => (
            <Card streamer={el} i={i} key={`${el.name}+${i}`} />
          ))}
        </AnimatePresence>
      </motion.div>
      {/* )} */}
    </div>
  );
};

export default List;
