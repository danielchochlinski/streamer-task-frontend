import React from "react";
import styles from "./Topbar.module.scss";
import { Input } from "@mui/joy";
const Topbar = () => {
  return (
    <div>
      <Input placeholder="Search by name!" />
    </div>
  );
};

export default Topbar;
