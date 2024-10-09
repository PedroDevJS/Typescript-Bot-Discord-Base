import Event from "#event";
import log from "#fx/log";
import { loadCommands } from "src/discord/proxys/CommandsLoad";
import { client } from "#bot";

const event: Event = {
    name: "",
    event: "ready", // pode colocar outro evento
    execute: async () => {
    }
};

export default event;