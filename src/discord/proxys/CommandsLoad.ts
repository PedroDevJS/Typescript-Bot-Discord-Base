import fs from 'fs';
import path from 'path';
import { Client, Collection, RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandSubCommandData, ApplicationCommandType, ApplicationCommandOptionData, ApplicationCommandStringOptionData, ApplicationCommandOptionType } from 'discord.js';
import Command from "../base/Command";
import log from '#fx/log';

let registerGlobal = false;

export async function loadCommands(client: Client) {
    const commands = new Collection<string, Command>();

    const commandFolders = fs.readdirSync(path.join(__dirname, '../client/commands'));

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(path.join(__dirname, '../client/commands', folder)).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const command: Command = (await import(`../client/commands/${folder}/${file}`)).default;
            commands.set(command.name, command);
        }
    }

    client.commands = commands;

    await registerCommands(commands, client);
}

async function registerCommands(commands: Collection<string, Command>, client: Client) {
    const commandData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = commands.map(command => {
        const options = command.options?.map(option => {

            if (option.type === ApplicationCommandOptionType.Subcommand) {
                const subcommandOptions: ApplicationCommandOptionData = {
                    name: option.name,
                    description: option.description,
                    type: ApplicationCommandOptionType.Subcommand,
                    options: option.options?.map(subOption => {
                        return {
                            name: subOption.name,
                            description: subOption.description,
                            type: subOption.type,
                            required: subOption.required ?? false,
                        } as ApplicationCommandStringOptionData;
                    }),
                };
                return subcommandOptions;
            } else if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
                const subcommandGroupOptions: ApplicationCommandSubCommandData = {
                    name: option.name,
                    description: option.description,
                    options: option.options?.map(subOption => {
                        return {
                            name: subOption.name,
                            description: subOption.description,
                            type: subOption.type,
                        } as unknown as ApplicationCommandStringOptionData;
                    }),
                    type: ApplicationCommandOptionType.Subcommand
                };
                return subcommandGroupOptions;
            }

            return {
                name: option.name,
                description: option.description,
                type: option.type,
                required: option.required ?? false,
            } as ApplicationCommandOptionData;
        });

        return {
            name: command.name,
            description: command.description,
            options: options,
            type: ApplicationCommandType.ChatInput,
        } as RESTPostAPIChatInputApplicationCommandsJSONBody;
    });

    try {
        log.info('Começando a registrar comandos...');

        if (registerGlobal === true) {
            await client.application?.commands.set(commandData);
        } else {

            await client?.guilds.cache.get("ID DA SUA GUILDA")?.commands.set(commandData);
            
        }

        log.success('Comandos registrados com sucesso!');
    } catch (error) {
        log.error('Erro ao registrar comandos:' + error);
    }
}
