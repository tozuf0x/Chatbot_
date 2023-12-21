import { NotificationInstance } from 'antd/es/notification/interface';

export const showNotification = (
  api: NotificationInstance,
  notificationData: INotificationData
) => {
  api[notificationData.type]({
    message: notificationData.title,
    description: notificationData.text,
  });
};
