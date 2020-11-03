const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");

//Setting up ports
const PORT_REDIS = process.env.PORT || 6379;
const PORT = process.env.PORT || 5000;

//configuring redis client on port 6379
const redis_client = redis.createClient(PORT_REDIS);

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`SerVer runnin on Port ${PORT}`);
});
