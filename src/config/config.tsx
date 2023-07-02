export const BASE_URL =
  process.env.REACT_APP_NODE_ENV === "dev"
    ? process.env.REACT_APP_LOCAL_URL || "http://localhost:8081/api"
    : process.env.REACT_APP_PROD_URL ||
      "https://streamers-api.onrender.com/api";
