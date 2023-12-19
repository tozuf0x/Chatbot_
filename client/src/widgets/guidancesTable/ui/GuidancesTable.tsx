import { Button, Flex, Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { appliedFieldFilters } from '../const';
import styles from './styles.module.scss';
import { data } from '@/mock/data';

interface IData {
  errorCode: React.Key;
  appliedField: string;
  errorText: string;
  guidanceText: string;
}

const columns: ColumnsType<IData> = [
  {
    title: 'Код ошибки',
    dataIndex: 'errorCode',
    width: '15%',
  },
  {
    title: 'Прикладная область',
    dataIndex: 'appliedField',
    width: '15%',
    filters: appliedFieldFilters,
  },
  {
    title: 'Текст ошибки',
    dataIndex: 'errorText',
    width: '35%',
  },
  {
    title: 'Рекомендация',
    dataIndex: 'guidanceText',
    width: '35%',
  },
];

const paginationConfig: TablePaginationConfig = {
  position: ['bottomCenter'],
  pageSizeOptions: [10, 25, 50],
};

export function GuidancesTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Table
        className={styles.table}
        columns={columns}
        rowKey={(record) => record.errorCode}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={paginationConfig}
        bordered
      />

      <Flex className={styles.buttons} justify="center" gap="large">
        <Button htmlType="button" type="primary">
          Добавить
        </Button>

        <Button htmlType="button" type="default">
          Редактировать
        </Button>

        <Button htmlType="button" type="primary" danger>
          Удалить
        </Button>
      </Flex>
    </>
  );
}
