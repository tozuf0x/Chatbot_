type TNotificationType = 'success' | 'info' | 'warning' | 'error';

type INotificationData = {
  type: TNotificationType;
  title: string;
  text: string;
};
