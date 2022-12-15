import { Command } from '../structures/Command';
import Logger from '../utils/Logger';
import { getGames } from 'epic-free-games';
import { EmbedBuilder } from '@discordjs/builders';

export default new Command({
    name: 'admin',
    description: 'Command for Admin',
    default_member_permissions: '8',
    options: [
        {
            type: 1,
            name: 'getfreegames',
            description: 'Get Free Games of Epic',
        },
    ],
    run: async ({ interaction }) => {
        if (interaction.isCommand()) {
            const Wakestufou =
                interaction.client.users.cache.get('361428013230981121');
            getGames('FR', true).then((res) => {
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

                    interaction.channel
                        ?.send({ embeds: [embed] })
                        .catch((err) => Logger.error('Error : ', err));
                });
            });
        }
    },
});
