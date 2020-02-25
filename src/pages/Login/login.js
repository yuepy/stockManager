import React, {Component} from 'react';
import '../../css/login.less';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class Login extends Component {
    constructor(){
        super();
    }
    loginIn=(username,password)=>{
        var header = {head:'Content-Type',value:'application/x-www-form-urlencoded'};
        AJAX.AJAX(utils.loginIn,'POST',"username="+username+"&password="+password+"",header,this.success,this.valueerror);
    }
    success=(res)=>{
        res = JSON.parse(res);
        if(res.msg == '成功'){
            document.cookie='JSESSION'+res.data.token;
            window.location.href = '/index';
        }else{
            alert(res.msg);
            window.location.reload();
        }
    }
    error=()=>{
        alert('请求失败,请重试');
    }
    submit=(event)=>{
        var username = event.target.parentNode.querySelector('.user').value;
        var password = event.target.parentNode.querySelector('.pwd').value;
        if(!username){
            alert('用户名不能为空!');
            window.location.reload();
            return;
        }
        if(!password){
            alert('用户名不能为空!');
            window.location.reload();
            return;
        }
        this.loginIn(username,password);
    }
    render() {
        return (
            <div id='login'>
                <div className='login-loginIn'>
                    <h1>用户登录</h1>
                    <input type='text' placeholder='用户名' className='user entry'/>
                    <input type='password' placeholder='密码' className='pwd entry'/>
                    <button onClick={this.submit}>登录</button>
                    <div className='slip'>
                        <div>
                            <input type='radio' />
                            <span>记住密码</span>
                        </div>
                        <div>
                            <span>忘记密码?</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}