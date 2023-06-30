import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppContext from "../../context/AppContext";
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
        {ctxApp.favouriteList.map((el) => (
          <span>{el}</span>
        ))}
      </div>
      {openNav ? (
        <FavoriteIcon onClick={() => handleNavbar()} />
      ) : (
        <FavoriteBorderIcon onClick={() => handleNavbar()} />
      )}
    </div>
  );
};

export default Navbar;
