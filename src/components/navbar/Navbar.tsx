import React, { useContext } from "react";
import styles from "./Navbar.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppContext from "../../context/AppContext";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Navbar = () => {
  const ctxApp = useContext(AppContext);
  const navigation = useNavigate();

  const handleNavbar = () => {
    ctxApp.setOpenNavContext();
  };
  const autocompleteSx = ctxApp.dataController
    ? { color: "#c30065", transition: "0.2s ease-in-out" }
    : { color: "white", transition: "0.2s ease-in-out" };

  return (
    <div
      className={`${styles.container} ${
        ctxApp.openNav ? styles.open : styles.closed
      }`}
    >
      <div className={styles.list}>
        <span>Your Favourites</span>
        {ctxApp.favouriteList.map((el: string, i: number) => (
          <div key={`${el}+${i}+navbar`} className={styles.favourites}>
            <span onClick={() => navigation(`/app/streamer/${el}`)}>{el}</span>
            <RemoveIcon onClick={() => ctxApp.removeFavouriteContext(el)} />
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <div className={styles.top}>
          <ArrowBackIosNewIcon onClick={() => navigation(-1)} />
          <HomeIcon onClick={() => navigation("/app")} />
        </div>
        <div className={styles.center}>
          {ctxApp.openNav ? (
            <FavoriteIcon
              style={{ color: "#c30065" }}
              onClick={() => handleNavbar()}
            />
          ) : (
            <Tooltip title="Favourites" size="sm">
              <FavoriteBorderIcon onClick={() => handleNavbar()} />
            </Tooltip>
          )}
          <Tooltip title={"Add Streamer"} size="sm">
            <AddIcon onClick={() => ctxApp.setOpenFormContext(true)} />
          </Tooltip>
          <Tooltip title={"Popular Streamers"} size="sm">
            <LocalFireDepartmentIcon
              sx={autocompleteSx}
              onClick={() => ctxApp.setDataControllerContext()}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
