import {
  Modal,
  Form,
  Input,
  Typography,
  Button,
  Flex,
  InputRef,
  Select,
  Divider,
} from 'antd';
import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, Ref, useRef, useState } from 'react';
import { changeMode } from '@/entities/guidance';
import { useAppDispatch, focusOnInput } from '@/shared/lib';
import { validationRule } from '../const';
import { getAppliedAreas } from '../lib/getAppliedAreas';
import styles from './styles.module.scss';
import { Mode } from '@/const';
import { guidances } from '@/mock/guidances';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export function AddGuidanceModal() {
  const inputRef = useRef();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const appliedAreas = getAppliedAreas(guidances);
  const [currentAppliedAreas, setCurrentAppliedAreas] = useState(appliedAreas);

  const handleModalOpen = (open: boolean) => open && focusOnInput(inputRef);

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleModeReset = () => {
    dispatch(changeMode(Mode.Idle));
  };

  const handleModalClose = () => {
    //!TODO: добавить запрет закрытия при отправке новой рекомендации
    // if (!isPending) {
    // }
    handleFormReset();
    handleModeReset();
  };

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    form.setFieldsValue({ [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = (data: IGuidanceData) => {
    //!TODO: добавить отправку новой записи с прокидом колбэка закрытия модалки
    handleModalClose();
    console.log(data);
  };

  const addAppliedArea = (evt: KeyboardEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    const newAppliedArea = (form.getFieldValue('newAppliedArea') as string).trim();

    if (newAppliedArea && !currentAppliedAreas.includes(newAppliedArea)) {
      setCurrentAppliedAreas([...currentAppliedAreas, newAppliedArea]);
      form.setFieldValue('newAppliedArea', '');
    }
  };

  return (
    <Modal
      className={styles.modal}
      open
      centered
      footer={false}
      afterOpenChange={handleModalOpen}
      onCancel={handleModalClose}
    >
      <Title className={styles.title} level={2}>
        Новая запись
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        validateTrigger="onSubmit"
        initialValues={{ appliedArea: currentAppliedAreas[0] }}
      >
        <Item
          className={clsx(styles.label, styles.item)}
          label="Код ошибки"
          name="errorCode"
          rules={validationRule.ErrorCode}
        >
          <Input
            ref={inputRef as unknown as Ref<InputRef>}
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
                    onPressEnter={addAppliedArea}
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
            Добавить
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
      </Form>
    </Modal>
  );
}
