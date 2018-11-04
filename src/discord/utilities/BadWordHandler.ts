import { Guild, Client, GuildMember, Message } from "discord.js";
import { Guild as DBGuild } from "../../database/entities/Guild";

export class BadWordHandler {
    private _client: Client;
    public constructor(client: Client) {
        this._client = client;
    }

    public async addWord(badWord: string, guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        dbGuild!.badWords.push(badWord.toLowerCase());
        return dbGuild!.save();
    }

    public async removeWord(badWord: string, guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        dbGuild!.badWords.splice(dbGuild!.badWords.indexOf(badWord), 1);
        return dbGuild!.save();
    }

    public async getWords(guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        return dbGuild!.badWords;
    }
}
