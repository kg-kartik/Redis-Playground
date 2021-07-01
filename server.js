const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");

//Definning routes
const testRoute = require("./routes/test");

//Setting up ports
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(bodyParser.json());

//Using routes
app.use("/", testRoute);

app.listen(PORT, () => {
	console.log(`SerVer runnin on Port ${PORT}`);
});
