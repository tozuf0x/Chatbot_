import { Form, Button, Flex } from 'antd';
import { useRef } from 'react';
import { changeMode, guidanceApi, FIRST_FILTER_NAME } from '@/entities/guidance';
import { useAppDispatch, focusOnInput } from '@/shared/lib';
import { ModalForm } from './ModalForm';
import styles from './styles.module.scss';
import { Mode } from '@/const';

export function AddGuidanceModal() {
  const inputRef = useRef();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [addGuidance, { isLoading }] = guidanceApi.useAddGuidanceMutation();

  const initialFormValues = {
    appliedArea: FIRST_FILTER_NAME,
  };

  const handleModalOpen = (open: boolean) => open && focusOnInput(inputRef);

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleModalClose = () => {
    if (!isLoading) {
      handleFormReset();
      dispatch(changeMode(Mode.Idle));
    }
  };

  const handleAddGuidanceSubmit = async ({
    errorCode,
    errorText,
    guidanceText,
    appliedArea,
  }: IGuidanceData) => {
    try {
      await addGuidance({
        errorCode: errorCode.trim(),
        errorText: errorText.trim(),
        guidanceText: guidanceText.trim(),
        appliedArea: appliedArea.trim() === FIRST_FILTER_NAME ? '' : appliedArea.trim(),
      }).unwrap();

      handleFormReset();
    } catch {
      throw new Error();
    }
  };

  return (
    <ModalForm
      ref={inputRef}
      form={form}
      title="Новая запись"
      initialFormValues={initialFormValues}
      disabled={isLoading}
      onModalClose={handleModalClose}
      onFormSubmit={(data) => void handleAddGuidanceSubmit(data)}
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
            loading={isLoading}
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
  );
}
