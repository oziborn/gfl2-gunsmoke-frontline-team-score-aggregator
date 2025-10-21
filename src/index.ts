import { Client, GatewayIntentBits, Events, Message } from 'discord.js';
import { v4 as uuidv4 } from 'uuid';

import { commands } from '@/discord/commands';
import { modals } from '@/discord/modals';
import { handler } from '@/eventHandler/messageCreate';
import { ENV } from '@/utils/env';
import { logger } from '@/utils/logger';
import { requestContext } from '@/utils/requestContext';

const client = new Client({
  intents: Object.values(GatewayIntentBits) as number[],
});

client.on(Events.ClientReady, () => {
  logger.info('START DISCORD BOT');
});

client.on(Events.MessageCreate, (message: Message) => {
  if (message.author.bot || message.attachments.size === 0) {
    return;
  }
  if (message.channelId !== ENV.DISCORD_OCR_TARGET_CHANNEL_ID) {
    return;
  }

  requestContext.run({ requestId: uuidv4() }, async () => {
    logger.info({ msg: 'START', message });
    try {
      await handler(message);
    } catch (err) {
      logger.error(err);
    }
    logger.info({ msg: 'END' });
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.channelId !== ENV.DISCORD_OCR_TARGET_CHANNEL_ID) {
    return;
  }

  requestContext.run({ requestId: uuidv4() }, async () => {
    if (interaction.isModalSubmit()) {
      logger.info(`受信したモーダルID: ${interaction.customId}`);

      try {
        const modal = modals[interaction.customId];
        if (!modal) {
          await interaction.reply({
            content: '*未定義のモーダル*',
            ephemeral: true,
          });
          return;
        }
        logger.debug(JSON.stringify(modal));

        await modal.execute(interaction);
      } catch (error) {
        logger.error(error);
        await interaction.reply({
          content: '*処理に失敗しました*',
          ephemeral: true,
        });
      }
    }

    if (interaction.isChatInputCommand()) {
      logger.info(`受信したコマンド: ${interaction.commandName}`);

      try {
        const command = commands[interaction.commandName];
        if (!command) {
          await interaction.reply({
            content: '*未定義のコマンド*',
            ephemeral: true,
          });
          return;
        }
        logger.debug(JSON.stringify(command));

        await command.execute(interaction);
      } catch (error) {
        logger.error(error);
        await interaction.reply({
          content: '*処理に失敗しました*',
          ephemeral: true,
        });
      }
    }
  });
});

client.login(ENV.DISCORD_TOKEN);
