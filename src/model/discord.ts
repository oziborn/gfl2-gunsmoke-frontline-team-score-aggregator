import {
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type Commands = {
  [key: string]: Command;
};

export type Modal = {
  modalId: string;
  execute: (interaction: ModalSubmitInteraction<CacheType>) => Promise<void>;
};

export type Modals = {
  [key: string]: Modal;
};
