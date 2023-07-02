import React, { useContext, useState } from "react";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { BASE_URL } from "../../../config/config";
import axios from "axios";
import { motion } from "framer-motion";
interface ICard {
  streamer: IStreamer;
  i: number;
}

const Card: React.FC<ICard> = ({ streamer, i }) => {
  const { _id: id, name, platforms, image, votes } = streamer;
  const ctxApp = useContext(AppContext);
  const [voteUp, setVoteUp] = useState<number>(votes?.up);
  const [voteDown, setVoteDown] = useState<number>(votes?.down);

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
  const vote = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    voteType: string
  ) => {
    e.stopPropagation(); // Stop event propagation
    try {
      const response = await axios.put(`${BASE_URL}/streamer/${id}`, {
        voteType,
      });
      const { votes: votesResponse } = response.data;
      setVoteUp(votesResponse?.up);
      setVoteDown(votesResponse?.down);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        className={styles.nft}
        onClick={() => navigate(`/app/streamer/${name}`)}
      >
        <div className={styles.main}>
          <img
            className={styles.tokenImage}
            src={`data:image/jpeg;base64,${image}`}
            alt="card"
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
                <a
                  href="https://youtu.be/NNC0kIzM1Fo?t=39"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imageFunction(el)} alt={el} />
                </a>
              </Tooltip>
            ))}
          </div>
          <div className={styles.votes}>
            <div>
              <ThumbUpOffAltIcon onClick={(e) => vote(e, "up")} />
              <span>{voteUp}</span>
            </div>
            <div>
              <ThumbDownOffAltIcon onClick={(e) => vote(e, "down")} />
              <span>{voteDown}</span>
            </div>
          </div>
          <hr />
        </div>
      </motion.div>
    </>
  );
};

export default Card;
