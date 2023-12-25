import { Form, Button, Flex, notification } from 'antd';
import {
  changeMode,
  changeSelectedGuidances,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { ModalForm } from './ModalForm';
import styles from './styles.module.scss';
import { Mode } from '@/const';

export function EditGuidanceModal() {
  const dispatch = useAppDispatch();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [selectedGuidance] = useAppSelector(selectedGuidancesSelector);

  const initialFormValues = {
    errorCode: selectedGuidance.errorCode,
    appliedArea: selectedGuidance.appliedArea,
    errorText: selectedGuidance.errorText,
    guidanceText: selectedGuidance.guidanceText,
  };

  const handleModalClose = () => {
    //!TODO: добавить запрет закрытия модалки при отправке отредактированной рекомендации
    // if (!isPending) {
    // }
    form.resetFields();
    dispatch(changeMode(Mode.Idle));
    dispatch(changeSelectedGuidances([]));
  };

  const handleFormSubmit = (record: IGuidanceData) => {
    //!TODO: добавить отправку отредактированной записи без закрытия модалки, перенести логику внутрь
    notificationApi.success({
      message: 'Успех!',
      description: 'Запись была успешно отредактирована',
      placement: 'topRight',
    });

    console.log('Была отредактирована запись: ', record);
  };

  return (
    <>
      {contextHolder}
      <ModalForm
        ref={undefined}
        form={form}
        title="Редактирование записи"
        initialFormValues={initialFormValues}
        onModalClose={handleModalClose}
        onFormSubmit={handleFormSubmit}
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
              Сохранить
            </Button>

            <Button
              htmlType="button"
              type="link"
              onClick={handleModalClose}
            >
              Отменить
            </Button>
          </Flex>
        }
      />
    </>
  );
}
