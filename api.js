const express = require("express");
const cors = require("cors");

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = express();
const PORT = 3000;

// Enable CORS for requests from localhost:5411
app.use(cors());

app.use(express.json());

app.get("/api/users", (req, res) => {
	const dataStore = [
		{ id: "se", number: getRandomNumber(1, 50) },
		{ id: "no", number: getRandomNumber(1, 25) },
		{ id: "dk", number: getRandomNumber(1, 50) },
		{ id: "fi", number: getRandomNumber(1, 10) },
	];

	res.json(dataStore);
	console.log("request sent");
});

app.post("/api/users", (req, res) => {
	const newUser = {
		id: dataStore.length + 1,
		name: req.body.name,
	};
	dataStore.push(newUser);
	res.status(201).json(newUser);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
