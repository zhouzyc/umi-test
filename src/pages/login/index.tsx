import React,{ useState,useEffect } from 'react';
import { useRequest,history,Link } from 'umi';
import { qrLogin } from '@/services';
import { Image,message } from 'antd';
import styles from './index.less';
import bg from  '@/assets/images/bg.png';

function UserLogin(props:any){
  //如果url上有code参数 表示已经授权进行登录
  const {code,state} = props.location.query;
  const { origin,pathname } = window.location;

  if(code){
    const { data,error, loading } = useRequest(() => {
      return qrLogin({code:code,state:state});
    });
    if (!error && !loading) {
      message.success('登录成功');
      setTimeout(()=>{
        history.push('/');
      },0);
    }
  }

  let appid = process.env.dd_app_id;
  let ddurl = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${origin}${pathname}`;

  const handleMessage = function (event:any) {
    var origin = event.origin;
    if( origin === "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
      var loginTmpCode = event.data;
      window.location.href = `${ddurl}&loginTmpCode=${loginTmpCode}`;
    }
  };

  window.addEventListener('message', handleMessage, false);

  //在页面渲染完毕后执行一次方法
  useEffect(()=>{
    // @ts-ignore
    DDLogin({
      id: "q_r_code_container",
      goto: encodeURIComponent(ddurl),
      style: "border:none;background-color:rgba(0,0,0,0);margin-top:-5px",
      width: "250",
      height: "300"
    });
    return ()=>{
      window.removeEventListener("message", handleMessage, false);
    }
  },[]);

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
              使用钉钉扫码进行登录
            </div>
            {process.env.NODE_ENV !== 'pro' ?<Link to="/signInM">手机登录</Link>:''}
            <div className={styles.box}>
              <div id="q_r_code_container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserLogin;
