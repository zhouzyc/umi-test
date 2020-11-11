import React,{ useEffect } from 'react';
import { history,useModel } from 'umi';
import { pwdLogin } from '@/services';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Image,message } from 'antd';
import styles from './index.less';
import bg from  '@/assets/images/bg.png';

function UserMobileLogin(){

  const {  setInitialState } = useModel('@@initialState');

  //设置style
  const divStyle = (): React.CSSProperties => ({
    width: 'auto',
    background:'none'
  });

  const onFinish = async (values:any) => {
    try {
      let res = await pwdLogin(values);
      message.success('登录成功');
      setInitialState(res.data);
      setTimeout(()=>{
        history.push('/');
      },0);
    }catch (e) {

    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.sign}>
        <div>
          <Image
            preview={false}
            width="100%"
            height="100%"
            src={bg}
          />
          <div className={styles.code}>
            <div className={styles.title}>
              使用钉钉手机进行登录
            </div>
            <div className={styles.box} style={divStyle()}>
              <ProForm
                labelAlign="right"
                size="large"
                onFinish={onFinish}
              >
                <ProForm.Group >
                  <ProFormText
                    name="mobile"
                    label="手机码号"
                    tooltip="钉钉登录手机号"
                    placeholder="请输入手机码号"
                    width="m"
                    rules={[{ required: true }]}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    label="密码"
                    name="password"
                    placeholder="请输入密码"
                    width="m"
                    rules={[{ required: true }]}
                  />
                </ProForm.Group>
              </ProForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserMobileLogin;
