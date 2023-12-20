import { Button, Flex, Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useState } from 'react';
import { changeMode } from '@/entities/guidance';
import { useAppDispatch } from '@/shared/lib';
import { getAppliedAreaFilters } from '../lib/getAppliedAreaFilters';
import styles from './styles.module.scss';
import { Mode } from '@/const';
import { guidances } from '@/mock/guidances';

export function GuidancesTable() {
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('selectedRowKeys: ', newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const appliedAreaFilters = getAppliedAreaFilters(guidances);

  const columns: ColumnsType<IGuidanceData> = [
    {
      title: 'Код ошибки',
      dataIndex: 'errorCode',
      width: '15%',
    },
    {
      title: 'Прикладная область',
      dataIndex: 'appliedArea',
      width: '15%',
      filters: appliedAreaFilters,
      filterSearch: true,
      onFilter: (value: boolean | Key, record: IGuidanceData) => record.appliedArea === value,
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

  return (
    <>
      <Table
        className={styles.table}
        columns={columns}
        rowKey={(record) => record.errorCode}
        dataSource={guidances}
        rowSelection={rowSelection}
        pagination={paginationConfig}
        bordered
      />

      <Flex className={styles.buttons} justify="center" gap="large">
        <Button
          htmlType="button"
          type="primary"
          onClick={() => dispatch(changeMode(Mode.Add))}
        >
          Добавить
        </Button>

        <Button
          htmlType="button"
          type="default"
          onClick={() => dispatch(changeMode(Mode.Edit))}
        >
          Редактировать
        </Button>

        <Button
          htmlType="button"
          type="primary"
          danger
          onClick={() => dispatch(changeMode(Mode.Delete))}
        >
          Удалить
        </Button>
      </Flex>
    </>
  );
}
