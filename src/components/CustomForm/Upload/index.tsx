import React from 'react';
import { Upload,Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  action: string;
  isOss?: boolean;
  maxFileSize?: number;
  fileTypes?: string[];
}

const UploadCustom = (props: Props) => {

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const onChange = (e:any) => {
    console.log("onChange",e)
  }

  const onRemove = (e:any) => {
    console.log("onRemove",e)
  }

  const getExtraData = {
    key: "",
    OSSAccessKeyId: "", // OSSData.accessId,
    policy: "", //OSSData.policy
    Signature: "" // OSSData.signature,
  }

  // const prop = {
  //   name: 'file',
  //   onChange,
  //   onRemove,
  //   data: getExtraData,
  //   fileList: ""
  // }

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>选择文件</Button>
    </Upload>
  )
}

export default UploadCustom;