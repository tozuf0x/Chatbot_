import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useRef, ChangeEvent } from 'react';
import styles from './styles.module.scss';

export function SearchDropdown({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  close,
}: FilterDropdownProps) {
  const inputRef = useRef<InputRef>(null);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSelectedKeys(evt.target.value ? [evt.target.value] : []);
  };

  const handleSearch = () => {
    confirm();
  };

  const handleReset = () => {
    clearFilters?.();
  };

  const handleClose = () => {
    handleReset();
    close();
  };

  return (
    <div
      className={styles.dropdown}
      onKeyDown={(evt) => evt.stopPropagation()}
    >
      <Input
        className={styles.input}
        ref={inputRef}
        value={selectedKeys[0]}
        placeholder="Поиск по коду ошибки"
        onChange={handleInputChange}
        onPressEnter={handleSearch}
      />

      <Space>
        <Button
          htmlType="button"
          type="primary"
          onClick={handleSearch}
          icon={<SearchOutlined />}
        >
          Искать
        </Button>

        <Button
          htmlType="button"
          type="link"
          onClick={handleClose}
        >
          Закрыть
        </Button>

        <Button
          htmlType="button"
          type="link"
          danger
          onClick={handleReset}
        >
          Сбросить
        </Button>
      </Space>
    </div>
  );
}
