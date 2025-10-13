import { command as showScoreCommand } from '@/discord/commands/showScore';
import { Command, Commands } from '@/model/discord';

export const commands: Commands = {
  [showScoreCommand.data.name]: showScoreCommand,
};

export const commandRegisterList: Command[] = [showScoreCommand];
