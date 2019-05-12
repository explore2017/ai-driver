import request from '@/utils/request';
import * as Url from '@/locales/zh-CN/driveUrl';

export async function query() {
  return request('/api/users');
}

//获取当前用户
export async function queryCurrent() {
  //return request('/api/currentUser');
  return request(Url.fetchCurrent);
}
