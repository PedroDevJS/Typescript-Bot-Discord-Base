import { ClientEvents, Events } from "discord.js";

export default interface Event {
    name: string;
    event: keyof ClientEvents;
    execute: (...args: any[]) => Promise<void>;
}
