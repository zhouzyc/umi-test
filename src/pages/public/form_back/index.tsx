import React from 'react';
import ProForm,{
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
  
} from '@ant-design/pro-form';
import styles from './index.less';


const {Group} = ProForm;

export default ()=> {
  return (
    <div className={styles.inner}>
      <h3>我是form表单</h3>
      <Group>
        <ProFormText
          name="name"
          label="规则名称"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        />

        <ProFormSelect
          name="target"
          label="监控对象"
          valueEnum={{
            0: '表一',
            1: '表二',
          }}
        />
      </Group>

      <Group>
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />

        <ProFormTextArea
          name="desc"
          label="规则描述"
          placeholder="请输入至少五个字符"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        />
      </Group>
      

      
      
    </div>
  );
};

