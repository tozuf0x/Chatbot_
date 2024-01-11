import { Button, Flex, Modal, Typography } from 'antd';
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
  const selectedGuidances = useAppSelector(selectedGuidancesSelector);

  const handleModalClose = () => {
    if (!isLoading) {
      dispatch(changeMode(Mode.Idle));
      dispatch(changeSelectedGuidances([]));
    }
  };

  const handleDeleteGuidancesSubmit = () => {
    try {
      // eslint-disable-next-line sonarjs/no-ignored-return
      selectedGuidances.map(
        async (item) => await deleteGuidance(item.errorCode).unwrap()
      );

      handleModalClose();
    } catch {
      throw new Error();
    }
  };

  return (
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
            onClick={handleDeleteGuidancesSubmit}
          >
            Удалить
          </Button>

          <Button
            htmlType="button"
            type="link"
            disabled={isLoading}
            onClick={handleModalClose}
          >
            Закрыть
          </Button>
        </Flex>,
      ]}
    >
    </Modal>
  );
}
