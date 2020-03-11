import React, {Component} from 'react';
import * as AJAX from 'component/AJAX.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
export default class CommonContent extends Component{
    constructor(){
        super();
        this.state={
            indexFlag:false
        }
    }
    render(){
        var _this = this;
        return(
           <div style={{display:'none'}}>
                <div className="showContent">
                    <li><span>虚拟供货商1</span><i></i></li>
                </div>
                <div className="inputContent">
                    <input/>
                    <div className="enterBtn">保存</div>
                    <div className="enterBtn">提交</div>
                </div>
           </div>
        )
    }
}