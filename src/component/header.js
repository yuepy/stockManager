import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'pageStyle/common/commonLeftMenu.less';
export default class navHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMask:false
        }
    }
    setCookie(cname, cvalue, exdays,win) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        win.cookie = cname + "=" + cvalue + "; " + expires;
    }
    showHide(){
        this.setState({
                userMask:!this.state.userMask
            })
    }
    logout(e){
        this.setCookie("JSESSION","",-1,e.target.ownerDocument);
        window.location.href = '/';
    }
    render() {
        var _this = this;
        return (
            <header className="navHeader">
                <div className="navLeft">
                    <span>有钱金店</span>
                    <span>在线库存管理系统</span>
                </div>
                <div className="navRight">
                    <span>库存管理员</span>
                    <i onClick={_this.showHide.bind(_this)}></i>
                </div>
                <div className="userMask" style={{display:_this.state.userMask?'block':'none'}}>
                    <li onClick={_this.logout.bind(_this)}>登出</li>
                </div>
                
            </header>
        )
    }
}