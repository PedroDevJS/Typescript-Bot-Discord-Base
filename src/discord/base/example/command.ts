import { ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js';
import Command from "#command";

const command: Command = {
    name: '',
    description: '',
    type: ApplicationCommandType.ChatInput,
    options: [],
    run: (interaction, client) => {

    },
};

export default command;