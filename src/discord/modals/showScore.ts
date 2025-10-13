import { ModalSubmitInteraction, CacheType } from 'discord.js';

import { Modal } from '@/model/discord';
import { getScore } from '@/repo/scores';

export const modal: Modal = {
  modalId: 'SHOW_SCORE',
  execute: async (
    interaction: ModalSubmitInteraction<CacheType>
  ): Promise<void> => {
    const textInput = interaction.fields.getTextInputValue('textInput');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(textInput)) {
      await interaction.reply({
        content: 'YYYY-MM-DD形式の値ではありません',
        ephemeral: true,
      });
      return;
    }

    const score = await getScore(textInput);
    if (Object.keys(score).length === 0) {
      await interaction.reply({
        content: `指定された日時のデータがありません: ${textInput}`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content:
          `**${textInput}**` +
          '\n' +
          '```\n' +
          JSON.stringify(score, null, 2) +
          '\n```',
        ephemeral: true,
      });
    }
  },
};
