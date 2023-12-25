import { Button, Flex, Modal, notification, Typography } from 'antd';
import {
  changeMode,
  changeSelectedGuidances,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import styles from './styles.module.scss';
import { Mode } from '@/const';

const { Title } = Typography;

export function DeleteGuidanceModal() {
  const dispatch = useAppDispatch();
  const [notificationApi, contextHolder] = notification.useNotification();
  const selectedGuidances = useAppSelector(selectedGuidancesSelector);

  const handleModalClose = () => {
    //!TODO: добавить запрет закрытия модалки при удалении записи
    // if (!isPending) {
    // }
    dispatch(changeMode(Mode.Idle));
    dispatch(changeSelectedGuidances([]));
  };

  const handleDeleteGuidanceSubmit = () => {
    //!TODO: добавить удаление записей с закрытием модалки, перенести логику внутрь
    handleModalClose();

    notificationApi.success({
      message: 'Успех!',
      description: 'Записи были успешно удалены',
      placement: 'topRight',
    });

    console.log('Были удалены записи: ', selectedGuidances);
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
              danger
              onClick={handleDeleteGuidanceSubmit}
            >
              Удалить
            </Button>

            <Button
              htmlType="button"
              type="link"
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
