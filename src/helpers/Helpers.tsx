import youtubeImg from "../assets/youtube.png";
import rumbleImg from "../assets/rumble.svg";
import kickImg from "../assets/kick.png";
import twitterImg from "../assets/twitter.png";
import twitchImg from "../assets/twitch.png";
import tiktokImg from "../assets/tiktok.png";
export const imageFunction = (platform: string): string => {
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
