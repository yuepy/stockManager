export const host = 'http://106.12.194.98';
export const token = document.cookie.split('JSESSION=')[1];
export const loginIn = host+'/api/login'; //登录接口
export const repassword = host+'api/repassword'; // 修改密码