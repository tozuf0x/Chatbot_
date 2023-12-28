import { Form, Button, Flex } from 'antd';
import {
  changeMode,
  changeSelectedGuidances,
  guidanceApi,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { ModalForm } from './ModalForm';
import styles from './styles.module.scss';
import { FIRST_FILTER_NAME, Mode } from '@/const';

export function EditGuidanceModal() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [editGuidance, { isLoading }] = guidanceApi.useEditGuidanceMutation();
  const [selectedGuidance] = useAppSelector(selectedGuidancesSelector);

  const initialFormValues = {
    errorCode: selectedGuidance.errorCode,
    appliedArea: selectedGuidance.appliedArea,
    errorText: selectedGuidance.errorText,
    guidanceText: selectedGuidance.guidanceText,
  };

  const handleModalClose = () => {
    if (!isLoading) {
      form.resetFields();
      dispatch(changeMode(Mode.Idle));
      dispatch(changeSelectedGuidances([]));
    }
  };

  const handleFormSubmit = async ({
    errorCode,
    errorText,
    guidanceText,
    appliedArea,
  }: IGuidanceData) => {
    //NOTE: errorCode временно не поменять из-за ограничений временного сервера
    await editGuidance({
      oldId: selectedGuidance.errorCode,
      body: {
        errorCode: errorCode.trim(),
        errorText: errorText.trim(),
        guidanceText: guidanceText.trim(),
        appliedArea: appliedArea.trim() === FIRST_FILTER_NAME ? '' : appliedArea.trim(),
      },
    });
  };

  return (
    <ModalForm
      ref={undefined}
      form={form}
      title="Редактирование записи"
      initialFormValues={initialFormValues}
      disabled={isLoading}
      onModalClose={handleModalClose}
      onFormSubmit={(data) => void handleFormSubmit(data)}
      buttons={
        <Flex
          className={styles.buttons}
          justify="center"
          gap="middle"
        >
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
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
  );
}
