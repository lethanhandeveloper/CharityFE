import { FeedbackUI } from '@models/feedback';

export const mapFeedbackUI = (data: any): FeedbackUI => ({
  content: data.content,
  imageUrl: data.userId?.imageUrl ? data.userId?.imageUrl : 'Ẩn danh',
  title: data.title,
  fullName: data.userId?.fullName ? data.userId?.fullName : 'Ẩn danh',
});
export const mapFeedbackUIs = (list: any): FeedbackUI[] =>
  list?.map((item: any) => mapFeedbackUI(item));
