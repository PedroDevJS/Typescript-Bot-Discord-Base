import Event from "#event";
import log from "#fx/log";
import { loadCommands } from "src/discord/proxys/CommandsLoad";
import { client } from "../bot";

const event: Event = {
    name: "BotReady",
    event: "ready",
    execute: async () => {
        log.success("Bot inicializado com sucesso!");
        loadCommands(client)
    }
};

export default event;