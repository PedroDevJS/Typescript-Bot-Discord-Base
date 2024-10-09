import { Client } from "discord.js";
import Event from "#event";
import fs from "fs";
import path from "path";
import log from "#fx/log";

const events: Event[] = [];

export default async function loadEvents(client: Client) {
    const eventsDir = path.join(process.cwd(), 'src/discord/client/events');
    const files = fs.readdirSync(eventsDir).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of files) {
        const eventPath = path.join(eventsDir, file);

        const { default: event }: { default: Event } = await import(`file://${eventPath}`);


        if (!event.name || !event.event) {
            log.error(`Evento inválido em ${file}: ${JSON.stringify(event)}`);
            continue;
        }

        events.push(event);
        client.on(event.event, (...args) => {
            executeEvent(client, event, ...args);
        });
        log.info(`Evento ${event.name} registrado`);
    }
}

async function executeEvent(_client: Client, event: Event, ...args: any[]) {
    try {
        await event.execute(...args);
    } catch (error) {
        log.error(`Erro ao executar o evento ${event.name}: ${error}`);
    }
}
