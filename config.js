require("dotenv").load();

module.exports = {
  "development": {
    "LOGIN_CALLBACK": "http://localhost:4200",
    "CONSUMER_KEY": process.env.CONSUMER_KEY,
    "CONSUMER_SECRET": process.env.CONSUMER_SECRET
  },
  "production": {
    "LOGIN_CALLBACK": "/",
    "CONSUMER_KEY": process.env.CONSUMER_KEY,
    "CONSUMER_SECRET": process.env.CONSUMER_SECRET
  }
}