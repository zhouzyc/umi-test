import React from 'react';
import { Radio } from 'antd';

const { Group } = Radio;

interface Options {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  options : Options[];
  onChange ?: () => void
}

const RadioCustom = (props: Props) => {
  const {options} = props;

  const onChange = (e:any) => {
    console.log(e.target.value)
  }

  return (
    <Group {...props} onChange={onChange}>
      {
        options.map((option,index) => {
         return (<Radio value={option.value} key={index}>{option.label}</Radio>)
        })
      }
        
    </Group>
  )
}

export default RadioCustom;