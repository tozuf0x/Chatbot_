import {
  Modal,
  Form,
  Input,
  Typography,
  Button,
  Flex,
  Select,
  Divider,
} from 'antd';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import {
  changeMode,
  changeSelectedGuidances,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { validationRule } from '../const';
import { getAppliedAreas } from '../lib/getAppliedAreas';
import styles from './styles.module.scss';
import { Mode } from '@/const';
import { guidances } from '@/mock/guidances';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export function EditGuidanceModal() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const appliedAreas = getAppliedAreas(guidances);
  const [currentAppliedAreas, setCurrentAppliedAreas] = useState(appliedAreas);
  const [selectedGuidance] = useAppSelector(selectedGuidancesSelector);

  const initialFormValues = {
    errorCode: selectedGuidance.errorCode,
    appliedArea: selectedGuidance.appliedArea,
    errorText: selectedGuidance.errorText,
    guidanceText: selectedGuidance.guidanceText,
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleModeReset = () => {
    dispatch(changeMode(Mode.Idle));
  };

  const handleModalClose = () => {
    //!TODO: добавить запрет закрытия модалки при отправке новой рекомендации
    // if (!isPending) {
    // }
    handleFormReset();
    handleModeReset();
    dispatch(changeSelectedGuidances([]));
  };

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    form.setFieldsValue({ [evt.target.name]: evt.target.value });
  };

  const handleAppliedAreaAdd = (evt: KeyboardEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    const newAppliedArea = (form.getFieldValue('newAppliedArea') as string).trim();

    if (newAppliedArea && !currentAppliedAreas.includes(newAppliedArea)) {
      setCurrentAppliedAreas([...currentAppliedAreas, newAppliedArea]);
      form.setFieldValue('newAppliedArea', '');
    }
  };

  const handleFormSubmit = (record: IGuidanceData) => {
    //!TODO: добавить отправку отредактированной записи без закрытия модалки
    console.log('Была отредактирована запись: ', record);
  };

  return (
    <Modal
      className={styles['modal-form']}
      title={
        <Title className={styles.title} level={2}>
          Редактирование записи
        </Title>
      }
      open
      centered
      footer={false}
      onCancel={handleModalClose}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        validateTrigger="onSubmit"
        initialValues={initialFormValues}
      >
        <Item
          className={clsx(styles.label, styles.item)}
          label="Код ошибки"
          name="errorCode"
          rules={validationRule.ErrorCode}
        >
          <Input
            className={styles.input}
            name="errorCode"
            maxLength={23}
            placeholder="Например, ERRORCODE123"
            showCount
            allowClear
            onChange={handleFieldChange}
          />
        </Item>

        <Item
          className={clsx(styles.label, styles.item)}
          label="Прикладная область"
          name="appliedArea"
        >
          <Select
            className={styles.select}
            showSearch
            options={currentAppliedAreas.map((item) => ({
              label: item,
              value: item,
            }))}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className={styles.divider} />

                <Item
                  name="newAppliedArea"
                  rules={validationRule.NewAppliedArea}
                  validateTrigger="onChange"
                >
                  <Input
                    className={styles.input}
                    name="newAppliedArea"
                    placeholder="Добавить новую прикладную область"
                    maxLength={20}
                    showCount
                    allowClear
                    onChange={handleFieldChange}
                    onPressEnter={handleAppliedAreaAdd}
                  />
                </Item>
              </>
            )}
          />
        </Item>

        <Item
          className={clsx(styles.label, styles.item)}
          label="Текст ошибки"
          name="errorText"
          rules={validationRule.ErrorText}
        >
          <TextArea
            className={styles.textarea}
            name="errorText"
            maxLength={73}
            rows={2}
            showCount
            allowClear
            onChange={handleFieldChange}
          />
        </Item>

        <Item
          className={styles.label}
          label="Рекомендация"
          name="guidanceText"
          rules={validationRule.GuidanceText}
        >
          <TextArea
            className={styles.textarea}
            name="guidanceText"
            rows={8}
            allowClear
            onChange={handleFieldChange}
          />
        </Item>

        <Flex className={styles.buttons} justify="center" gap="middle">
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>

          <Button htmlType="button" type="link" onClick={handleModalClose}>
            Отменить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
