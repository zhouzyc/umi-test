import React from 'react';
import { DatePicker, TimePicker } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;

interface Config {
  picker: any;
  comp: string;
}

const DatePickerCustom = (props: Config) => {
  const {comp} = props;
  
  if(comp === 'point'){
    return (
      <DatePicker {...props} />
    )
  } else {
    return (
      <RangePicker {...props} />
    )
  }
    
}

export default DatePickerCustom;