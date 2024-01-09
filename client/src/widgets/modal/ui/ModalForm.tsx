import {
  Modal,
  Form,
  Input,
  Typography,
  Select,
  Divider,
  InputRef,
  FormInstance,
} from 'antd';
import clsx from 'clsx';
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  Ref,
} from 'react';
import { guidanceApi } from '@/entities/guidance';
import { getAppliedAreas } from '../lib/getAppliedAreas';
import { getValidationRule } from '../lib/getValidationRule';
import styles from './styles.module.scss';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

interface IModal {
  title: string;
  form: FormInstance;
  initialFormValues: { [key: string]: unknown };
  disabled: boolean;
  buttons: ReactNode;
  onModalClose: () => void;
  onFormSubmit: (record: IGuidanceData) => void;
  onModalOpen?: (open: boolean) => boolean | void;
}

// eslint-disable-next-line prefer-arrow-callback
export const ModalForm = forwardRef(function ModalForm(
  {
    title,
    form,
    initialFormValues,
    disabled,
    buttons,
    onModalClose,
    onFormSubmit,
    onModalOpen,
  }: IModal,
  ref
) {
  const { data: guidances } = guidanceApi.useGetAllGuidancesQuery(null);
  const appliedAreas = getAppliedAreas(guidances);
  const [currentAppliedAreas, setCurrentAppliedAreas] = useState(appliedAreas);

  const handleFieldChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    form.setFieldsValue({ [evt.target.name]: evt.target.value });
  };

  const handleAppliedAreaAdd = (evt: KeyboardEvent) => {
    evt.preventDefault();
    const newAppliedArea = (form.getFieldValue('newAppliedArea') as string).trim();

    if (newAppliedArea && !currentAppliedAreas.includes(newAppliedArea)) {
      setCurrentAppliedAreas([...currentAppliedAreas, newAppliedArea]);
      form.setFieldValue('appliedArea', newAppliedArea);
      form.setFieldValue('newAppliedArea', '');
    }
  };

  const handleSelectBlur = () => {
    form.setFieldValue('newAppliedArea', '');
  };

  const checkIsAppliedAreaExist = (_: unknown, value: string) => {
    if (!currentAppliedAreas.includes(value)) {
      return Promise.resolve();
    }

    return Promise.reject();
  };

  const ValidationRule = getValidationRule(checkIsAppliedAreaExist);

  return (
    <Modal
      className={styles['modal-form']}
      title={
        <Title
          className={styles.title}
          level={2}
        >
          {title}
        </Title>
      }
      open
      centered
      footer={false}
      afterOpenChange={onModalOpen}
      onCancel={onModalClose}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger="onSubmit"
        disabled={disabled}
        initialValues={initialFormValues}
        onFinish={onFormSubmit}
      >
        <Item
          className={clsx(styles.label, styles.item)}
          label="Код ошибки"
          name="errorCode"
          rules={ValidationRule.ErrorCode}
        >
          <Input
            ref={ref as unknown as Ref<InputRef>}
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
          label="Текст ошибки"
          name="errorText"
          rules={ValidationRule.ErrorText}
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
          rules={ValidationRule.GuidanceText}
        >
          <TextArea
            className={styles.textarea}
            name="guidanceText"
            rows={8}
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
            onBlur={handleSelectBlur}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className={styles.divider} />

                <Item
                  name="newAppliedArea"
                  rules={ValidationRule.NewAppliedArea}
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

        {buttons}
      </Form>
    </Modal>
  );
});
