import React, {Component} from 'react';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
export default class CommonContent extends Component{
    constructor(){
        super();
        this.state={
            data:''
        }
    }
    componentDidMount=()=>{
        var _this = this;
        _this.getData();
    }
    getData=()=>{
        var _this = this;
        var url = _this.props.Type=='supplier'?'http://106.12.194.98/api/supplier/list':'http://106.12.194.98/api/customer/list';
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url+'?num=1000','GET',false,head,this.isLogin.bind(_this),_this.error);
    }
    isLogin=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        _this.setState({
            data : res.data.data
        })
    }
    ischangeLogin=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        _this.getData();
    }
    save(e){
        debugger
        var _this = this;
        if(_this.props.Type=='supplier'){
            if(e.target.ownerDocument.querySelector('#supplierValue').value==''){
                return;
            }
            var value = e.target.ownerDocument.querySelector('#supplierValue').value;
            e.target.ownerDocument.querySelector('#supplierValue').value = '';
            var url = 'http://106.12.194.98/api/supplier/add?name='+value; 
        }else if(_this.props.Type=='customer'){
            if(e.target.ownerDocument.querySelector('#customerValue').value==''){
                return;
            }
            var customerValue = e.target.ownerDocument.querySelector('#customerValue').value;
            var telValue = e.target.ownerDocument.querySelector('#telValue').value;
            e.target.ownerDocument.querySelector('#customerValue').value = '';
            e.target.ownerDocument.querySelector('#telValue').value = '';
            var url = 'http://106.12.194.98/api/customer/add?name='+customerValue+'&mobile='+telValue;
        }
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'POST',false,head,_this.ischangeLogin.bind(_this),_this.error); 
    }
    isConfirm(e){
        var _this = this;
        var value = e.target.textContent;
        var id = e.target.id;
        var isStatus = confirm('确认删除：'+value+'?');
        if(isStatus){
            _this.delete(value,id);
        }
    }
    delete(val,id){
        debugger
        var _this = this;
        if(_this.props.Type=='supplier'){
           var url = 'http://106.12.194.98/api/supplier/delete?name='+val+'&ids='+id;  
        }else if(_this.props.Type=='customer'){
           var url = 'http://106.12.194.98/api/customer/delete?name='+val+'&ids='+id;  
        }
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'POST',false,head,_this.ischangeLogin.bind(_this),_this.error);    
    }
    render(){
        var _this = this;
        return(
            <div className="showSupplier" style={{display:_this.props.Show}}>
                <div className="mask"></div>
                <div className="alertBox">
                    <div className="showContent">
                        {_this.state&&_this.state.data!==''&&_this.state.data.data!==''&&_this.state.data.map(function(d,i){
                            return(<li title={d.name} onClick={_this.isConfirm.bind(_this)} id={d.id}>{d.name}</li>)
                        })}
                    </div>
                    {_this.props.Type=='supplier'?
                    <div className="inputContent">
                        <input id="supplierValue" placeholder="请输入供应商名称（必填项）"/>
                        <div className="enterBtn" onClick={_this.save.bind(_this)}>提交</div>
                        <div className="enterBtn" onClick={_this.props.close.bind(_this)}>关闭</div>
                    </div>:
                    <div className="inputContent">
                        <input id="customerValue" placeholder="请输入客户名称（必填项）"/>
                        <input id="telValue" placeholder="请输入电话号码"/>
                        <div className="enterBtn" onClick={_this.save.bind(_this)}>提交</div>
                        <div className="enterBtn" onClick={_this.props.close.bind(_this)}>关闭</div>
                    </div>
                    }
               </div>
            </div>
           
        )
    }
}