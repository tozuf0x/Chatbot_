import { Button, Flex, notification, Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key, useEffect } from 'react';
import {
  changeMode,
  changeSelectedGuidances,
  guidanceApi,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import { useAppDispatch, useAppSelector, scrollToTop } from '@/shared/lib';
import { getAppliedAreaFilters } from '../lib/getAppliedAreaFilters';
import styles from './styles.module.scss';
import { Mode } from '@/const';

export function GuidancesTable() {
  const dispatch = useAppDispatch();
  const [notificationApi, contextHolder] = notification.useNotification();
  const selectedGuidances = useAppSelector(selectedGuidancesSelector);
  const selectedRowKeys = selectedGuidances.map((item) => item.errorCode);
  const {
    data: guidances,
    isUninitialized,
    isLoading,
    isError,
  } = guidanceApi.useGetAllGuidancesQuery(null);
  const appliedAreaFilters = getAppliedAreaFilters(guidances);

  useEffect(() => {
    if (isError) {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить данные таблицы',
        placement: 'topRight',
      });
    }
  });

  const columnsConfig: ColumnsType<IGuidanceData> = [
    {
      title: 'Код ошибки',
      dataIndex: 'errorCode',
      width: '15%',
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
    {
      title: 'Прикладная область',
      dataIndex: 'appliedArea',
      width: '15%',
      filters: appliedAreaFilters,
      filterSearch: true,
      onFilter: (value: boolean | Key, record: IGuidanceData) => record.appliedArea === value,
    },
  ];

  const paginationConfig: TablePaginationConfig = {
    position: ['bottomCenter'],
    pageSizeOptions: [10, 25, 50, 100],
  };

  const handleSelectedGuidancesChange = (_: Key[], records: IGuidanceData[]) => {
    dispatch(changeSelectedGuidances(records));
    console.log('selectedRecords: ', records);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectedGuidancesChange,
  };

  const handleAddButtonClick = () => {
    dispatch(changeMode(Mode.Add));
  };

  const handleEditButtonClick = () => {
    if (selectedGuidances.length === 0) {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Не выбрана запись для редактирования',
        placement: 'topRight',
      });

      return;
    }

    if (selectedGuidances.length > 1) {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Нельзя одновременно редактировать несколько записей',
        placement: 'topRight',
      });

      return;
    }

    dispatch(changeMode(Mode.Edit));
  };

  const handleDeleteButtonClick = () => {
    if (selectedGuidances.length === 0) {
      notificationApi.error({
        message: 'Ошибка!',
        description: 'Не выбраны записи для удаления',
        placement: 'topRight',
      });

      return;
    }

    dispatch(changeMode(Mode.Delete));
  };

  const handleTableChange = () => scrollToTop();

  return (
    <>
      {contextHolder}
      <Table
        className={styles.table}
        columns={columnsConfig}
        rowKey={(record) => record.errorCode}
        dataSource={guidances}
        rowSelection={rowSelection}
        pagination={paginationConfig}
        loading={isUninitialized || isLoading}
        bordered
        onChange={handleTableChange}
      />

      <Flex
        className={styles.buttons}
        justify="center"
        gap="large"
      >
        <Button
          htmlType="button"
          type="primary"
          disabled={isUninitialized || isLoading}
          onClick={handleAddButtonClick}
        >
          Добавить
        </Button>

        <Button
          htmlType="button"
          type="default"
          disabled={isUninitialized || isLoading}
          onClick={handleEditButtonClick}
        >
          Редактировать
        </Button>

        <Button
          htmlType="button"
          type="primary"
          disabled={isUninitialized || isLoading}
          danger
          onClick={handleDeleteButtonClick}
        >
          Удалить
        </Button>
      </Flex>
    </>
  );
}
