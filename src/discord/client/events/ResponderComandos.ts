import Event from "#event";
import log from "#fx/log";
import { client } from "../bot";
import { CommandInteraction } from "discord.js";

const event: Event = {
    name: "Responder comando",
    event: "interactionCreate",
    execute: async (interaction: CommandInteraction) => {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        try {
            const command = client.commands.get(commandName);
            if (command) {
                await command.run(interaction);
            } else {
                await interaction.reply({ content: "Comando não encontrado.", ephemeral: true });
            }
        } catch (error) {
            log.error("Erro ao executar o comando:" + error);
            await interaction.reply({ content: "Houve um erro ao executar esse comando.", ephemeral: true });
        }
    }
};

export default event;
