import React, {useState,useEffect} from 'react';
import { Row } from 'antd';
import CustomForms from "@/components/CustomForm/index";

const column = [
  {
    label: "",
    prop: "search",
    mold: "input",
    placeholder: "请输入密码",
    type: 'password',
    rule: [{required: true, message: 'Please input your password!'}]
  },
  {
    label: '角色类型',
    prop: 'roleType',
    mold: 'select',
    placeholder: "请选择",
    default: "",
    options: [
      { value: '1', label: '111' },
      { value: '2', label: '222' },
      { value: '3', label: '333' },
    ],
  },
  {
    label: '角色名1',
    prop: 'roleName1',
    mold:  "input",
    placeholder: "请输入角色名"
  },
  {
    label: '选择日期',
    prop: 'date',
    mold: "datePicker",
    comp: "point", // 选择某一个时间点
    picker: "date",
  },
  {
    label: '选择范围',
    prop: 'dateRange',
    mold: "datePicker",
    comp: "range", // 选择一段时间范围
    picker: "week",
  },
  {
    label: '爱好',
    prop: 'like',
    mold: 'select',
    mode: "multiple",
    placeholder: "请选择",
    default: [],
    showArrow: true,
    maxTagCount: 1,
    style: {
      width: 160
    },
    options: []
  },
  {
    label: '备注信息',
    prop: 'eps',
    mold: "input",
    type: "textarea",
    // disabled: true
  },
  {
    label: '性别',
    prop: 'sex',
    mold: 'radio',
    options: [
      {
        label: '女',
        value: 1
      },
      {
        label: '男',
        value: 2,
        // disabled: true
      },
    ],
  },
  // {
  //   label: "上传文件",
  //   prop: "file",
  //   mold: "upload",
  //   action: "",
  //   maxFileSize: 10,
  //   fileTypes: [""]
  // }
]
const btns = [
  {
    icon: "SearchOutlined",
    name: "查询"
  }
]

function Demo(){
  const demoType = 'inline'; // 设置布局方式
  let initialValues = {};
  let [loading,setLoading] = useState(true);

  const getMockOptions = () => {
    return [
      { value: '1', label: '跑步' },
      { value: '2', label: '阅读' },
      { value: '3', label: '唱歌' },
      { value: '4', label: '写作' },
    ]
  }

  useEffect(() => {
    column[5].options = getMockOptions();
    setLoading(false)
  })
  
  return (
    !loading ?
    <Row>
      <CustomForms 
        columns={column} 
        type={demoType} 
        btns={btns} 
        initialValues={initialValues} />
    </Row>
    :
    <div></div>
  )
}

export default Demo;