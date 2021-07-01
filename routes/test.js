const express = require("express");
const router = express.Router();
const axios = require("axios");
const {cache} = require("../middleware/cachemiddleware");
const redis = require("redis");
const dotenv= require("dotenv");

const PORT_REDIS = process.env.PORT || 6379;

dotenv.config({});
const apiUrl = process.env.apiUrl;

//configuring redis client on port 6379
const client = redis.createClient(PORT_REDIS);

router.post("/", cache,async (req, res) => {
	try {

		const {query} = req.body;

		const result = await axios.post(apiUrl,{
			query
		});		

		//Storing data in redis in memory db for caching
		client.setex(query, 3600, JSON.stringify(result.data));

		res.status(200).json({
			data:result.data
		});

	} catch (error) {
		console.log(error,"error");
		res.status(422).json({
			error
		});
	}
});


module.exports = router;
