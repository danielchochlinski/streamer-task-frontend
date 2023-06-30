import React, { useContext } from "react";
import { IStreamer } from "../../../types/types";
import styles from "./Card.module.scss";
import youtubeImg from "../../../assets/youtube.png";
import rumbleImg from "../../../assets/rumble.svg";
import kickImg from "../../../assets/kick.png";
import twitterImg from "../../../assets/twitter.png";
import twitchImg from "../../../assets/twitch.png";
import tiktokImg from "../../../assets/tiktok.png";
import Tooltip from "@mui/joy/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

interface ICard {
  streamer: IStreamer;
  i: number;
}

const Card: React.FC<ICard> = ({ streamer, i }) => {
  const ctxApp = useContext(AppContext);
  const { _id: id, name, platforms, image } = streamer;
  const navigate = useNavigate();

  const imageFunction = (platform: string): string => {
    return platform === "youtube"
      ? youtubeImg
      : platform === "rumble"
      ? rumbleImg
      : platform === "kick"
      ? kickImg
      : platform === "twitter"
      ? twitterImg
      : platform === "twitch"
      ? twitchImg
      : platform === "tiktok"
      ? tiktokImg
      : "";
  };

  const handleFavourite = (e: { stopPropagation: () => void }) => {
    ctxApp.favouriteList.includes(name)
      ? ctxApp.removeFavouriteContext(name)
      : ctxApp.addFavouriteContext(name);
    e.stopPropagation();
  };

  const isFavourite = ctxApp.favouriteList.includes(name);

  return (
    <>
      <div className={styles.nft} onClick={() => navigate(`/streamer/${id}`)}>
        <div className={styles.main}>
          <img
            className={styles.tokenImage}
            src={`data:image/jpeg;base64,${image}`}
            alt="NFT"
          />

          <h2>{name}</h2>

          <div className={styles.platform}>
            {isFavourite ? (
              <FavoriteIcon
                className={`${styles.favourite} ${styles.icon}`}
                onClick={(e) => handleFavourite(e)}
                style={{ color: "#c30065" }}
              />
            ) : (
              <FavoriteBorderIcon
                className={`${styles.no_favourite} ${styles.icon}`}
                onClick={(e) => handleFavourite(e)}
              />
            )}

            {platforms?.map((el, i) => (
              <Tooltip
                title={el.toLocaleUpperCase()}
                size="sm"
                key={`${el}+${i}`}
              >
                <a href="https://youtu.be/NNC0kIzM1Fo?t=39" target="_blank">
                  <img src={imageFunction(el)} alt={el} />
                </a>
              </Tooltip>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Card;
