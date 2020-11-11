import React from 'react';
import { Input } from 'antd';

const { TextArea,Password } = Input;

interface Props {
  placeholder ?: string;
  disabled ?: boolean;
  type ?: string;
}

const InputCustom = (props: Props) => {
  let Component;

  switch(props.type){
    case 'textarea':
      Component = TextArea;
      break;
    case 'password':
      Component = Password;
      break;
    default:
      Component = Input;
  }

  return (
    <Component {...props} />
  )
}

export default InputCustom;