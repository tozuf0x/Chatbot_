import { Button, Input, InputRef, Space } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useRef, ChangeEvent } from 'react';
import styles from './styles.module.scss';

export function SearchDropdown(
  {
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close
  }: FilterDropdownProps,
  placeholder: string
) {
  const inputRef = useRef<InputRef>(null);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSelectedKeys(evt.target.value ? [evt.target.value] : []);
    confirm({ closeDropdown: false });
  };

  const handleClose = () => {
    close();
  };

  const handleReset = () => {
    setSelectedKeys([]);
    confirm({ closeDropdown: false });
    clearFilters?.();
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
        placeholder={placeholder}
        onChange={handleInputChange}
      />

      <Space>
        <Button
          htmlType="button"
          type="primary"
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
