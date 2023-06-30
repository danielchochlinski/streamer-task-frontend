import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppContext from "../../context/AppContext";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/joy";

const Navbar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const ctxApp = useContext(AppContext);
  const handleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <div
      className={`${styles.container} ${openNav ? styles.open : styles.closed}`}
    >
      <div className={styles.list}>
        <span>Your Favourites</span>
        {ctxApp.favouriteList.map((el) => (
          <span>{el}</span>
        ))}
      </div>

      <div className={styles.buttons}>
        {openNav ? (
          <FavoriteIcon onClick={() => handleNavbar()} />
        ) : (
          <FavoriteBorderIcon onClick={() => handleNavbar()} />
        )}
        <Tooltip title={"Add Streamer"} size="sm">
          <AddIcon onClick={() => ctxApp.setOpenFormContext(true)} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
