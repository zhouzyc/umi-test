import React, { useState, useRef } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Space, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

import { TableType } from './types';

function Table<T>(props: TableType.Props<T>) {
  const tableRef = useRef<TableType.ActionType>();
  const formRef = useRef<FormInstance>();

  let {
    needRowSelection,
    dataSource,
    onSubmit,
    columns,
    pagination,
    loading,
    onFormValuesChange,
    rightOptions,
    search,
  } = props;

  const toolOptions = {
    fullScreen: true,
    reload: false,
    setting: true,
  };

  const tableAlertRender = (params: any) => {
    let { selectedRowKeys, selectedRows, onCleanSelected } = params;
    return (
      <Space size={24}>
        <span>
          已选 {selectedRowKeys.length} 项
          <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
            取消选择
          </a>
        </span>
      </Space>
    );
  };

  const toolBarRender = () => [
    <Button key="show">查看日志</Button>,
    <Button key="out">
      导出数据
      <DownOutlined />
    </Button>,
    <Button key="primary" type="primary">
      创建应用
    </Button>,
  ];

  let _columns = columns;

  let _search: any = {
    searchText: '查询',
    resetText: '重置',
    defaultCollapsed: true,
    collapseRender: (collapsed: boolean, showCollapseButton?: any) => {
      return (
        <div>
          {collapsed ? (
            <span>
              <DownOutlined /> 展开
            </span>
          ) : (
            <span>
              <UpOutlined /> 收起
            </span>
          )}
        </div>
      );
    },
    optionRender: (searchConfig: any, formProps: any) => {
      let { searchText, resetText } = searchConfig;
      let { form } = formProps;
      return [
        <Button
          key="search"
          type="primary"
          onClick={() => {
            form?.submit();
          }}
        >
          {searchText}
        </Button>,
        <Button
          key="rest"
          onClick={() => {
            form && form.resetFields();
          }}
        >
          {resetText}
        </Button>,
      ];
    },
  };

  let form = {
    onFinish: (values: any) => {
      console.log(values);
    },
    onFinishFailed: () => {
      console.log('error');
    },
  };

  // 处理search
  if (typeof search === 'boolean') {
    if (!search) _search = false;
  } else {
    _search = search;
  }

  // 动态加载右侧操作栏
  if (rightOptions instanceof Array && rightOptions.length > 0) {
    _columns = columns.concat(rightOptions);
  }

  // Table 顶部搜索表单 字段change事件处理方法
  if (!!onFormValuesChange) {
    Object.defineProperty(form, 'onValuesChange', {
      value: (changedValues: any, allValues: any) =>
        onFormValuesChange(changedValues, allValues, formRef),
    });
  }

  return (
    <>
      <ProTable<T>
        // form={form}
        loading={loading}
        dataSource={dataSource}
        pagination={pagination || undefined}
        // actionRef={tableRef}
        formRef={formRef}
        rowSelection={needRowSelection ? {} : undefined}
        columns={_columns}
        tableAlertOptionRender={false}
        options={toolOptions}
        tableAlertRender={tableAlertRender}
        toolBarRender={toolBarRender}
        onSubmit={params => onSubmit(params)}
        search={_search}
        rowKey="id"
      />
    </>
  );
}

export default Table;
