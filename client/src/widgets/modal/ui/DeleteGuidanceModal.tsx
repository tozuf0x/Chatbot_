import { Button, Flex, Modal, notification, Typography } from 'antd';
import {
  changeMode,
  changeSelectedGuidances,
  guidanceApi,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import styles from './styles.module.scss';
import { Mode } from '@/const';

const { Title } = Typography;

export function DeleteGuidanceModal() {
  const dispatch = useAppDispatch();
  const [deleteGuidance, { isLoading }] = guidanceApi.useDeleteGuidanceMutation();
  const [notificationApi, contextHolder] = notification.useNotification();
  const selectedGuidances = useAppSelector(selectedGuidancesSelector);

  const handleModalClose = () => {
    if (!isLoading) {
      dispatch(changeMode(Mode.Idle));
      dispatch(changeSelectedGuidances([]));
    }
  };

  const handleDeleteGuidancesSubmit = async () => {
    try {
      const response = await Promise.all(selectedGuidances.map((item) => deleteGuidance(item.errorCode)));
      const hasError = response.find((item) => 'error' in item);

      if (hasError) {
        throw new Error();
      }

      handleModalClose();

      notificationApi.success({
        message: 'Успех!',
        description: 'Записи были успешно удалены',
        placement: 'topRight',
      });
    } catch {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Не удалось удалить записи',
        placement: 'topRight',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        className={styles['modal-dialog']}
        title={
          <Title
            className={styles.title}
            level={2}
          >
            Вы действительно хотите безвозвратно удалить выбранные записи? (
            {`${selectedGuidances.length}`})
          </Title>
        }
        open
        centered
        onCancel={handleModalClose}
        footer={[
          <Flex
            key="buttons"
            className={styles.buttons}
            justify="center"
          >
            <Button
              htmlType="button"
              type="primary"
              loading={isLoading}
              danger
              onClick={() => void handleDeleteGuidancesSubmit()}
            >
              Удалить
            </Button>

            <Button
              htmlType="button"
              type="link"
              disabled={isLoading}
              onClick={handleModalClose}
            >
              Отменить
            </Button>
          </Flex>,
        ]}
      >
      </Modal>
    </>
  );
}
