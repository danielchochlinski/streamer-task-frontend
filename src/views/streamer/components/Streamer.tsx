import React, { useContext, useEffect, useState } from "react";
import styles from "./Streamer.module.scss";
import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useParams } from "react-router-dom";
import { IStreamer } from "../../../types/types";
import { imageFunction } from "../../../helpers/Helpers";
import { Tooltip } from "@mui/joy";
import Loading from "../../../components/loading/Loading";
import AppContext from "../../../context/AppContext";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  uniqueID,
  useNotification,
} from "../../../context/notifications/NotificationProvider";

const Streamer = () => {
  const ctxApp = useContext(AppContext);
  const [voteUp, setVoteUp] = useState<number>(0);
  const [voteDown, setVoteDown] = useState<number>(0);

  const { id } = useParams();
  const [data, setData] = useState<IStreamer | null>(null);
  const notification = useNotification();

  const getStreamer = async () => {
    try {
      ctxApp.setLoadingContext(true);
      const response = await axios.get(`${BASE_URL}/streamer?name=${id}`);
      setData(response?.data?.streamer);
      setVoteUp(response?.data?.streamer?.votes?.up);
      setVoteDown(response?.data?.streamer?.votes?.down);

      ctxApp.setLoadingContext(false);
    } catch (err) {
      notification({
        id: uniqueID(),
        type: "ERROR",
        message: "Ups something went wrong!",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    getStreamer();
  }, [id]); // eslint-disable-line

  const vote = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    voteType: string
  ) => {
    e.stopPropagation(); // Stop event propagation
    try {
      const response = await axios.put(`${BASE_URL}/streamer/${data?._id}`, {
        voteType,
      });
      const { votes: votesResponse } = response?.data;
      setVoteUp(votesResponse?.up);
      setVoteDown(votesResponse?.down);
    } catch (err) {
      console.error(err);
    }
  };
  const handleFavourite = (e: { stopPropagation: () => void }) => {
    data && ctxApp.favouriteList.includes(data?.name)
      ? ctxApp.removeFavouriteContext(data?.name)
      : data && ctxApp.addFavouriteContext(data?.name);
    e.stopPropagation();
  };
  const isFavourite = data && ctxApp.favouriteList.includes(data?.name);

  return (
    <div className={styles.container}>
      {ctxApp.loading ? (
        <Loading />
      ) : (
        <article className={styles.profile}>
          <div className={styles.profile_image}>
            <img src={`data:image/jpeg;base64,${data?.image}`} alt="streame" />
          </div>
          <h2 className={styles.profile_username}>{data?.name}</h2>
          <p>{data?.description}</p>
          <div className={styles.profile_actions}>
            {data?.platforms.map((el, i: number) => (
              <Tooltip
                title={el.toLocaleUpperCase()}
                size="sm"
                key={`${el}+${i}`}
              >
                <a
                  className={`${styles.btn} ${styles.icon}`}
                  href="https://youtu.be/NNC0kIzM1Fo?t=39"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imageFunction(el)} alt={el} />
                </a>
              </Tooltip>
            ))}
          </div>
          <hr />

          <div className={styles.votes}>
            <div>
              <ThumbUpOffAltIcon
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  vote(e, "up")
                }
              />
              <span>{voteUp}</span>
            </div>
            <div>
              {isFavourite ? (
                <FavoriteIcon
                  onClick={(e) => handleFavourite(e)}
                  style={{ color: "#c30065" }}
                />
              ) : (
                <FavoriteBorderIcon onClick={(e) => handleFavourite(e)} />
              )}
            </div>
            <div>
              <ThumbDownOffAltIcon
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  vote(e, "down")
                }
              />
              <span>{voteDown}</span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default Streamer;
