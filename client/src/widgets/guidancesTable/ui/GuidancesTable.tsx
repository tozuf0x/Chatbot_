import { Button, Flex, Table, TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Key } from 'react';
import {
  changeMode,
  changeSelectedGuidances,
  guidanceApi,
  selectedGuidancesSelector,
} from '@/entities/guidance';
import {
  useAppDispatch,
  useAppSelector,
  scrollToTop,
  changeNotification,
} from '@/shared/lib';
import { getAppliedAreaFilters } from '../lib/getAppliedAreaFilters';
import styles from './styles.module.scss';
import { Mode } from '@/const';

export function GuidancesTable() {
  const dispatch = useAppDispatch();
  const selectedGuidances = useAppSelector(selectedGuidancesSelector);
  const selectedRowKeys = selectedGuidances.map((item) => item.errorCode);
  const {
    data: guidances,
    isUninitialized,
    isLoading,
  } = guidanceApi.useGetAllGuidancesQuery(null);
  const appliedAreaFilters = getAppliedAreaFilters(guidances);

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
      dispatch(
        changeNotification({
          type: 'error',
          title: 'Ошибка!',
          text: 'Не выбрана запись для редактирования',
        })
      );

      return;
    }

    if (selectedGuidances.length > 1) {
      dispatch(
        changeNotification({
          type: 'error',
          title: 'Ошибка!',
          text: 'Нельзя одновременно редактировать несколько записей',
        })
      );

      return;
    }

    dispatch(changeMode(Mode.Edit));
  };

  const handleDeleteButtonClick = () => {
    if (selectedGuidances.length === 0) {
      dispatch(
        changeNotification({
          type: 'error',
          title: 'Ошибка!',
          text: 'Не выбраны записи для удаления',
        })
      );

      return;
    }

    dispatch(changeMode(Mode.Delete));
  };

  const handleTableChange = () => scrollToTop();

  return (
    <>
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
