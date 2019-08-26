const prod = process.env.NODE_ENV === "production";

module.exports = {
  target: "serverless",
  env: {
    API_URL: prod ? process.env.API_URL_PROD : process.env.API_URL_DEV
  }
};
