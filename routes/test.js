const express = require("express");
const router = express.Router();
const axios = require("axios");
const redis = require("redis");

const PORT_REDIS = process.env.PORT || 6379;

//configuring redis client on port 6379
const redis_client = redis.createClient(PORT_REDIS);

router.get("/", async (req, res) => {
	try {
		const result = await axios.get("https://api.radioactive11.me/random");

		return res.status(200).json(result.data);

		//Adding data to Redis
		redis_client.setex("data", 3600, JSON.stringify(result.data));
	} catch (error) {
		return res.status(422).json(error);
	}
});

module.exports = router;
