import log from "#fx/log";
import { loadEvents } from "@pedrozmz/easy-discord.js";
import "dotenv/config"

export function initBoostrap() {
    loadEvents("../discord/client", __dirname).then(() => {
        log.success(`Init - Bot Ticket V1`)
    })
}