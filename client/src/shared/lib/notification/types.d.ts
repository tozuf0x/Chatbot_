type TNotificationType = 'success' | 'info' | 'warning' | 'error';

interface INotificationData {
  type: TNotificationType;
  title: string;
  text: string;
}
