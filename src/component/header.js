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
    render() {
        return (
            <header className="navHeader">
                <div className="navLeft">
                    <span>有钱金店</span>
                    <span>在线库存管理系统</span>
                </div>
                <div className="navRight">
                    <span>虚拟用户</span>
                    <i></i>
                </div>
                <div className="userMask">
                    <li>登出</li>
                </div>
                
            </header>
        )
    }
}