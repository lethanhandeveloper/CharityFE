import { UserUI } from './user';

export interface FeedbackUI {
  id: string;
  title: string;
  content: string;
  isShowImage: boolean;
  user: UserUI;
}
