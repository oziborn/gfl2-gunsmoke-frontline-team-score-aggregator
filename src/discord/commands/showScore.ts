import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} from 'discord.js';

import { modal as showScoreModal } from '@/discord/modals/showScore';
import { Command } from '@/model/discord';

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName('score')
    .setDescription('指定した日付のスコアを表示します'),
  execute: async (Interaction: ChatInputCommandInteraction): Promise<void> => {
    const modal = new ModalBuilder({
      custom_id: showScoreModal.modalId,
      title: '指定した日付のスコアを表示します',
    });

    const textInput = new TextInputBuilder({
      custom_id: 'textInput',
      label: 'YYYY-MM-DD形式で入力してください',
      style: TextInputStyle.Short,
      required: true,
    });

    const item = new ActionRowBuilder<TextInputBuilder>().addComponents(
      textInput
    );
    modal.addActionRowComponents(item);
    await Interaction.showModal(modal);
  },
};
