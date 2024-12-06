require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const bodyParser = require('body-parser');

const app = express();

// Load environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const PORT = process.env.PORT || 3000;

// Discord Bot Setup
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.once('ready', () => {
    console.log('Discord bot is online!');
});

bot.login(BOT_TOKEN);

// Middleware
app.use(bodyParser.json());

// API to receive notifications
app.post('/send-notification', (req, res) => {
    const { title, message } = req.body;
    if (title && message) {
        bot.channels.cache.get(CHANNEL_ID)?.send(`**${title}**\n${message}`);
        res.status(200).send('Notification sent to Discord!');
    } else {
        res.status(400).send('Invalid data');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
