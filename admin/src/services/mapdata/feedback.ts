import { FeedbackUI } from '@models/feedback';
import { mapUserUI } from './user';

export const mapFeedbackUI = (FeedbackAPI: any): FeedbackUI => ({
  id: FeedbackAPI._id,
  title: FeedbackAPI.title,
  content: FeedbackAPI.content,
  user: mapUserUI(FeedbackAPI.userId),
  isShowImage: FeedbackAPI.isShowImage,
});

export const mapFeedbacksUI = (userAPI: any): FeedbackUI[] => {
  return userAPI?.map((item: any) => mapFeedbackUI(item));
};
