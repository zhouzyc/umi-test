import { ProColumnType } from '@ant-design/pro-table';

declare namespace TableType {
  interface Props<T> {
    needRowSelection?: boolean;
    rightOptions?: Columns<T>[];
    dataSource: any[];
    onSubmit: Function;
    columns: Columns<T>[];
    pagination?: any;
    loading?: boolean;
    onFormValuesChange: Function;
    search?: Object | boolean;
  }

  interface ActionType {
    reload: () => void;
    fetchMore: () => void;
    reset: () => void;
  }

  interface Columns<T> extends ProColumnType<T> {
    xxx?: number;
  }
}

export { TableType };
