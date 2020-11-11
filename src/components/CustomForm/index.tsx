import React,{useState} from 'react';
import { Button,Form,Row,Col } from 'antd';
import  "./index.less"

interface OptionsConfig {
  value: any;
  label: string;
}

interface BtnConfig {
  icon: string;
  name: string;
}

interface RuleConfig {
  required:boolean;
  message: string;
} 

interface FormItem {
  label: string;
  prop: string;
  mold: string;
  default?: any;
  options?: OptionsConfig[];
  rule?: RuleConfig[] ; // | (() => void) 后续考虑
}

interface Config {
  initialValues : object; // 初始值
  columns: FormItem[];
  type: string;
  form?: any;
  btns: BtnConfig[];
  labelAlign?: any
}


const CustomForms = (props: Config) => {
  const {columns,type,btns} = props;
  let formFields = columns;
  let ComponentItem = Form.Item;
  const FormItem = type === 'inline' ? Col: Row;

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try{
      // console.log(form)
      console.log("formValues=>",form.getFieldsValue())
      await form.validateFields()

    }catch(err){
      console.log(err)
    }
   
  };

  return (
    <Form className="custom-forms" {...props} form={form}  onFinish={handleSubmit}>
      {
          formFields.map((field,index) => {
            
            const fieldType = field.mold;
            let FieldComp;
            switch (fieldType){
              case 'input':
                FieldComp = require(`./Input`).default(field);
                break;
              case 'select':
                FieldComp = require(`./Select`).default(field);
                break;
              case "datePicker":
                FieldComp = require(`./DatePicker`).default(field);
                break;
              case "radio":
                FieldComp = require(`./RadioGroup`).default(field);
                break;
              case "upload":
                FieldComp = require(`./Upload`).default(field);
                break;
              default:
                return (
                  <div>抱歉，类型错误</div>
                )
            }

            return (
              <FormItem key={`col-${index}`} className="custom-forms-row">
                <div className="col-item-inline custom-forms-item">
                {
                  <ComponentItem 
                    label={field.label} 
                    name={field.prop}
                    rules={field.rule}
                    >
                    {FieldComp}
                  </ComponentItem>
                }
                </div>
              </FormItem>
              
            )
          })
        }
      <div className="btns">
        {
          btns.map((btn,index) => {
            let IconItem = require(`@ant-design/icons`)[btn.icon]; // 动态引入图标
            
            return (
            <Button key={index} type="primary" icon={<IconItem />} htmlType="submit" >
              {btn.name}
            </Button>)
          })
        }
        
      </div>
    </Form>
  )
}

export default CustomForms;