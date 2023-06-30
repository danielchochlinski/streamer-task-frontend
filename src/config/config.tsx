export const BASE_URL =
  process.env.REACT_APP_NODE_ENV === "dev"
    ? "http://localhost:8081/api"
    : "production url to be established";
