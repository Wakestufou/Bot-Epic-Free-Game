import { Color } from '../utils/Colors';
import { Event } from '../structures/Event';
import Logger from '../utils/Logger';
import cron from 'node-cron';
import { getGames } from 'epic-free-games';
import { EmbedBuilder } from '@discordjs/builders';
import { Channel, TextChannel } from 'discord.js';

export default new Event('ready', (client) => {
    Logger.info('Bot is online ! ' + client.user?.tag, 'READY', Color.FgGreen);

    let channel: Channel | undefined;

    if (process.argv.includes('--DEV'))
        channel = client.channels.cache.get(process.env.CHANNEL_DEV as string);
    else channel = client.channels.cache.get(process.env.CHANNEL as string);

    cron.schedule('10 17 * * *', () => {
        Logger.info('New Shedule');
        const Wakestufou = client.users.cache.get('361428013230981121');
        getGames('FR', true)
            .then((res) => {
                Logger.info('getGames ok. Size : ' + res.currentGames.length);
                res.currentGames.forEach((element) => {
                    const urlsImage = element.keyImages;
                    const urlsLengthImage = urlsImage.length;

                    const embed = new EmbedBuilder()
                        .setColor(0x0099ff)
                        .setTitle(element.title)
                        .setDescription(element.description)
                        .setAuthor({
                            name: 'Epic Games Store',
                            iconURL:
                                'https://logos-world.net/wp-content/uploads/2021/12/Epic-Games-Logo-700x394.png',
                            url: 'https://store.epicgames.com/fr/free-games',
                        });

                    if (Wakestufou === undefined) {
                        embed.setFooter({
                            text: 'Bot créé par Wakestufou !',
                        });
                    } else {
                        embed.setFooter({
                            text: 'Bot créé par Wakestufou !',
                            iconURL: Wakestufou.avatarURL()?.toString(),
                        });
                    }

                    if (urlsLengthImage > 0) {
                        embed.setThumbnail(urlsImage[0].url);
                        if (urlsLengthImage > 1)
                            embed.setImage(urlsImage[1].url);
                    }

                    if (channel instanceof TextChannel) {
                        channel
                            .send({
                                embeds: [embed],
                                content: `**Un nouveau jeu gratuit est disponible ! **||<@&${
                                    process.argv.includes('--DEV')
                                        ? process.env.ROLE_DEV_ID
                                        : process.env.ROLE_ID
                                }>||`,
                            })
                            .then(() => Logger.info('Message envoyé !'))
                            .catch((err) => Logger.error('Error : ', err));
                    }
                });
            })
            .catch((err) => Logger.error('Error : ', err));
    });
});
