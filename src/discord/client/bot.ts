import { Client, GatewayIntentBits } from "discord.js";
import loadEvents from "../proxys/EventsLoad";

export const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] })

loadEvents(client);

client.login(process.env.token)