import React from 'react';
import { Select } from 'antd';
import "./index.less"

interface OptionsConfig {
  value: any;
  label: string;
}

interface Props {
  default: any;
  options: OptionsConfig[];
  style ?: Object;
  maxTagCount?: number;
  placeholder: string;
}

const SelectCustom = (props: Props) => {
  const { options} = props;

  return (
    <Select style={{width: 100}}  {...props}  >
     {
       options.map((option,index) => {
        return <Select.Option value={option.value} key={index}>{option.label}</Select.Option>
       })
     }
      
    </Select>
  )
}
export default SelectCustom;