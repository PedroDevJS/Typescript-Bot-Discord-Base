import {
    ApplicationCommandOptionData,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    Client
} from "discord.js";


export default interface Command {
    description: string;
    name: string;
    type: ApplicationCommandType; // Tipo do comando, como ChatInput, Message, etc.
    options?: ApplicationCommandOptionData[];
    run(interaction: ChatInputCommandInteraction, client: Client): void; 
}
