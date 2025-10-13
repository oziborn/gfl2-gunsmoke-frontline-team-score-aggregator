import { REST, Routes } from 'discord.js';

import { commandRegisterList } from '@/discord/commands';
import { ENV } from '@/utils/env';
import { logger } from '@/utils/logger';

const commands = commandRegisterList.map((item) => item.data.toJSON());
const rest = new REST({ version: '10' }).setToken(ENV.DISCORD_TOKEN);

(async () => {
  try {
    logger.info('コマンドの登録を開始');
    logger.debug(JSON.stringify(commands));

    await rest.put(
      Routes.applicationGuildCommands(
        ENV.DISCORD_CLIENT_ID,
        ENV.DISCORD_GUILD_ID
      ),
      {
        body: commands,
      }
    );

    logger.info(`正常に終了しました`);
  } catch (error) {
    logger.error(`失敗しました`);
    logger.error(error);
  }
})();
