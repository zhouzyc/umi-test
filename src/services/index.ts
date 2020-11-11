
import {postBody,getQuery} from './handler'

/**
 * 钉钉扫码码登录
 *
 ***/
interface qrLoginType {
  // 钉钉返回code
  code: String;
  // 钉钉返回state
  state: String;
}

export async function qrLogin(data: qrLoginType) {
  return getQuery('/api/user/qrLogin',data)
}

/**
 * 钉钉密码登录
 *
 ***/
interface pwdLoginType {
  // 手机号
  mobile: String;
  // 密码
  password: any;
}

export async function pwdLogin(data: pwdLoginType) {
  return postBody('/api/user/pwdLogin', data)
}


/**
 * 获取用户信息
 *
 ***/
export async function isLogin() {
  return postBody('/api/user/isLogin')
}
