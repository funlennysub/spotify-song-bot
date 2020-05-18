const Discord = require("discord.js");
const moment = require("moment");

const USER_ID = "user id";
const SERVER_ID = "server id";
const CHANNEL_ID = "channel id";

const client =  new Discord.Client({ disableMentions: "everyone" });

client.on("ready", () => {
    console.log("Bot is ready to send information about music!")
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
   const user_to_track = client.users.cache.get(USER_ID);
    if(oldPresence.user.id !== user_to_track.id || newPresence.user.id !== user_to_track.id) return;
    if(oldPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING") === undefined) return;
    const channel_to_send = client.guilds.cache.get(SERVER_ID).channels.cache.get(CHANNEL_ID);

    const TRACK_NAME = newPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING").details;
    const TRACK_AUTHOR = newPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING").state;
    const ALBUM_NAME = newPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING").assets.largeText;
    const TRACK_IMG = `https://i.scdn.co/image/${newPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING").assets.largeImage.slice(8)}`;
    const TRACK_URL = `https://open.spotify.com/track/${newPresence.user.presence.activities.find(a => a.name === "Spotify" && a.type === "LISTENING").syncID}`;



    const Embed = new Discord.MessageEmbed()

    .setTitle("Spotify Song Bot")
    .setColor(0x1ED760)
    .setThumbnail(TRACK_IMG)
    .addField("🎶 Song name", TRACK_NAME)
    .addField("🎤 Author", TRACK_AUTHOR)
    .addField("📀 Album", ALBUM_NAME)
    .addField('Listen to Track:', `[${TRACK_URL}](${TRACK_URL})`)
    .setFooter(`At ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
    channel_to_send.send(Embed)
})

client.login("bot token")
