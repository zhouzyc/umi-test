import React, { useState, useEffect } from 'react';
// import { ProColumns, ProColumnType } from '@ant-design/pro-table';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';

import './index.less';
import { TableType } from '@/components/Table/types';
import Select from '@/components/CustomForm/Select';
import Table from '@/components/Table';
import Confirm from '@/components//Table/Confirm';
import { Space, Tag, Button } from 'antd';

import request from 'umi-request';

// import {proTest} from '@/services'
import MineSelect from './select1';


interface ProportionItem {
  deptName?: string;
  projectName?: string;
  dateText?: string;
  decideTimeValue?: string;
  channelName?: string;
  positionName?: string;
  parkValue?: string;
  notParkValue?: string;
  note?: string;
}

// const getColumns = (options: any): TableType.Columns<any>[] => {
//   return [
const columns: TableType.Columns<any>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    // search: false,
    sorter: (a: any, b: any) => a.id - b.id,
  },
  {
    title: '事业部',
    dataIndex: 'deptName',
    key: 'deptName',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    // search: false,
    // width: 120,
    // sorter: (a: any, b: any) => a - b,
  },
  {
    title: '项目',
    dataIndex: 'projectName',
    key: 'projectName',
    valueType: 'text',
    // search: false,
    // width: 120
  },
  {
    title: '生效时间',
    dataIndex: 'dateText',
    key: 'dateText',
    // search: false,
    valueType: 'date',
    render: (_, record) => {
      return <div>{record.dateText}</div>;
    },
  },
  {
    title: '判定时间',
    key: 'decideTimeValue',
    width: 120,
    dataIndex: 'decideTimeValue',
    // search: false,
    render: (_, row) => <Space>{123}</Space>,
  },
  {
    title: '销售渠道',
    dataIndex: 'channelName',
    key: 'dechannelNameptName',
    valueType: 'text',
    // search: false,
    // width: 120,
    // sorter: (a: any, b: any) => a - b,
  },
  {
    title: '岗位',
    dataIndex: 'positionName',
    key: 'positionName',
    valueType: 'select',
    renderFormItem: (item, props, form) => {
      let NewComponent = MineSelect(Select);
      return (
        <NewComponent
          default={0}
          options={[
            { value: 0, label: 'kiana' },
            { value: 1, label: 'bronya' },
            { value: 2, label: 'rita' },
          ]}
        ></NewComponent>
      );
    },
    // search: false,
    // width: 120
  },
  {
    title: '车位-调整后',
    dataIndex: 'parkValue',
    key: 'parkValue',
    // search: false,
    valueType: 'text',
    // width: 120,
    // sorter: (a: any, b: any) => a - b,
  },
  {
    title: '非车位-调整后',
    dataIndex: 'notParkValue',
    key: 'notParkValue',
    // search: false,
    valueType: 'text',
    // width: 120
  },
  {
    title: '申请原因',
    dataIndex: 'note',
    key: 'note',
    valueType: 'text',
    // search: false,
    // width: 120
  },
];

const rightOptions: TableType.Columns<any>[] = [
  {
    title: '操作1',
    width: 180,
    key: 'option3',
    valueType: 'option',
    fixed: 'right',
    render: (
      text: React.ReactNode,
      record: any,
      index: number,
      action: any,
    ) => {
      return (
        <Confirm
          onOk={(handleCancel: Function) => {
            request('/api/protable/list').then(() => {
              setTimeout(() => {
                handleCancel();
              }, 2000);
            });
          }}
        ></Confirm>
      );
    },
    xxx: 123,
  },
];

const protable = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  const onSubmit = (params: any) => {
    request('/api/protable/list', { params }).then(res => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDataSource(res.data.list);
      }, 1500);
    });
  };

  const onFormValuesChange = (
    changedValues: any,
    allValues: any,
    formRef: any,
  ) => {
    console.log(formRef.current.getFieldValue('deptName'));
  };

  // 15308047727
  return (
    <Table<ProportionItem>
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      needRowSelection={true}
      rightOptions={rightOptions}
      onSubmit={onSubmit}
      search={true}
      onFormValuesChange={onFormValuesChange}
    ></Table>
  );
};

export default protable;
