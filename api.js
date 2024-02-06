const express = require("express");
const cors = require("cors");

let amount = 0;
let sen, non, dkn, fin;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateValues() {
    sen = getRandomNumber(1, 50);
    non = getRandomNumber(1, 25);
    dkn = getRandomNumber(1, 50);
    fin = getRandomNumber(1, 10);
}

updateValues();

setInterval(updateValues, 60000);

const app = express();
const PORT = 3000;

// Enable CORS for requests from localhost:5411
app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
    const dataStore = [
        { id: "se", number: sen },
        { id: "no", number: non },
        { id: "dk", number: dkn },
        { id: "fi", number: fin },
    ];

    res.json(dataStore);
    console.log("request " + amount + " sent");
    amount++;
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
