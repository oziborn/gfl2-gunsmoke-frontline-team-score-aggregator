import { modal as showScoreModal } from '@/discord/modals/showScore';
import { Modal, Modals } from '@/model/discord';

// TODO: スコアを訂正するコマンド
export const modals: Modals = {
  [showScoreModal.modalId]: showScoreModal,
};

export const modalList: Modal[] = [showScoreModal];
