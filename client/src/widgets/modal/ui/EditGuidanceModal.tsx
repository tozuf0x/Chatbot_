import { Form, Button, Flex } from 'antd';
import {
  changeMode,
  changeSelectedGuidances,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import {
  changeNotification,
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib';
import { ModalForm } from './ModalForm';
import styles from './styles.module.scss';
import { Mode } from '@/const';

export function EditGuidanceModal() {
  const dispatch = useAppDispatch();
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
    dispatch(
      changeNotification({
        type: 'success',
        title: 'Успех!',
        text: 'Запись была успешно отредактирована',
      })
    );

    console.log('Была отредактирована запись: ', record);
  };

  return (
    <ModalForm
      ref={undefined}
      form={form}
      title="Редактирование записи"
      initialFormValues={initialFormValues}
      onModalClose={handleModalClose}
      onFormSubmit={handleFormSubmit}
      buttons={
        <Flex className={styles.buttons} justify="center" gap="middle">
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>

          <Button htmlType="button" type="link" onClick={handleModalClose}>
            Отменить
          </Button>
        </Flex>
      }
    />
  );
}
