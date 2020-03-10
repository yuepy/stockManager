import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'pageStyle/common/commonLeftMenu.less';
export default class CommonLeftMenu extends Component {
    componentDidMount(){
        if(document.querySelector('.Allmenu')){
            var num = location.pathname == '/index' || location.pathname == '/goodsDetail'?0:(location.pathname == '/warehousing'?1:(location.pathname == '/outStock'?2:location.pathname == '/stockHistory'?3:''));
            if(!document.querySelector('.Allmenu').querySelectorAll('li')[num].classList.contains('active')) document.querySelector('.Allmenu').querySelectorAll('li')[num].classList.add('active');
        }
    }
    toggleClass=(e)=>{
        var _this = this;
        if(e.target.nodeName == 'UL' || e.target.nodeName == 'LI' || e.target.parentNode.classList.contains('active')){
            return;
        }
        _this.addClass(e.target.parentNode.parentNode,'active');
        e.target.classList.add('active');
    }
    addClass = (obj,className)=>{
        if(!obj || ! className || obj.children.length<1){
            console.error('参数问题!');
            return;
        }
        var lis = obj.querySelectorAll('li');
        for(let i=0;i<lis.length;i++){
            if(lis[i].classList.contains(className)){
                lis[i].classList.remove(className);
            }
        }
    }
    render() {
        return (
            <div className='commonLeftMenu'>
                <div className='title'>
                    <h3>银店库存管理系统</h3>
                </div>
                <div className='Allmenu'>
                    <ul className='menu' onClick={this.toggleClass.bind(this)}>
                        <li><Link to='/index'>全部库存</Link></li>
                        <li><Link to='/warehousing'>商品入库</Link></li>
                        <li><Link to='/outStock'>商品出库</Link></li>
                        <li><Link to='/stockHistory'>商品出库记录</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}