import { Form, Button, Flex, notification } from 'antd';
import { useRef } from 'react';
import { changeMode } from '@/entities/guidance';
import { useAppDispatch, focusOnInput } from '@/shared/lib';
import { getAppliedAreas } from '../lib/getAppliedAreas';
import { ModalForm } from './ModalForm';
import styles from './styles.module.scss';
import { Mode } from '@/const';
import { guidances } from '@/mock/guidances';

export function AddGuidanceModal() {
  const inputRef = useRef();
  const dispatch = useAppDispatch();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const appliedAreas = getAppliedAreas(guidances);

  const initialFormValues = {
    appliedArea: appliedAreas[0],
  };

  const handleModalOpen = (open: boolean) => open && focusOnInput(inputRef);

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleModalClose = () => {
    //!TODO: добавить запрет закрытия модалки при отправке новой рекомендации
    // if (!isPending) {
    // }
    handleFormReset();
    dispatch(changeMode(Mode.Idle));
  };

  const handleFormSubmit = (record: IGuidanceData) => {
    //!TODO: добавить отправку новой записи без закрытия модалки, перенести логику внутрь
    handleFormReset();

    notificationApi.success({
      message: 'Успех!',
      description: 'Новая запись была успешно добавлена',
      placement: 'topRight',
    });

    console.log('Была добавлена новая запись: ', record);
  };

  return (
    <>
      {contextHolder}
      <ModalForm
        ref={inputRef}
        form={form}
        title="Новая запись"
        initialFormValues={initialFormValues}
        onModalClose={handleModalClose}
        onFormSubmit={handleFormSubmit}
        onModalOpen={handleModalOpen}
        buttons={
          <Flex
            className={styles.buttons}
            justify="center"
            gap="middle"
          >
            <Button
              htmlType="submit"
              type="primary"
            >
              Добавить
            </Button>

            <Button
              htmlType="button"
              type="link"
              onClick={handleModalClose}
            >
              Отменить
            </Button>

            <Button
              htmlType="button"
              type="link"
              danger
              onClick={handleFormReset}
            >
              Сбросить
            </Button>
          </Flex>
        }
      />
    </>
  );
}
