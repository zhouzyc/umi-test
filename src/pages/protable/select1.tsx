import React, {useEffect, useState} from "react";
import request from 'umi-request';

// import Select from "@/components/CustomForm/Select";

interface OptionsConfig {
  value: any;
  label: string;
}

interface SelectProps {
  default: any;
  options: OptionsConfig[];
}

const MineSelect = (Component1: any) => {
  return ( props: SelectProps) => {
    const [options, setOptions] = useState<OptionsConfig[]>([]);
    const [url, setUrl] = useState<string>('/api/protable/select0')
    
    useEffect(() => {
      let temp: OptionsConfig[]= []
      request(url).then(res => {
        temp =  res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        setOptions(temp)
      });
      console.log('Select!!!');
      return function cleanup () {  
        console.log('destory');
      }
    }, []);
    // destory() 
    return (
      <Component1 default={props.default} options={options} placeholder="请选择"></Component1>
    )
  }
}

export default MineSelect
