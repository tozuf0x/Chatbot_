import { notificationSelector } from './selectors';

describe('Redux selectors: "notification" domain', () => {
  const mockNotification = {
    type: 'error',
    title: 'Ошибка!',
    text: 'Не удалось отредактировать заметку',
  } as INotificationData;

  const mockStore: State = {
    notification: {
      notification: mockNotification,
    },
  };

  describe('Selector: notificationSelector', () => {
    test('Should return a mode', () => {
      const expectedResult = mockStore.notification.notification;

      const result = notificationSelector(mockStore);

      expect(result).toEqual(expectedResult);
    });
  });
});
