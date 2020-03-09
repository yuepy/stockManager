import React, {Component} from 'react';
import 'pageStyle/common/common.less'
import CommonLeftMenu from 'component/commonLeftMenu.js';
import NavHeader from 'component/header.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import CommonContent from 'component/commonContent.js';
import PageFooter from 'component/footer.js';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : '',
           deleteFlag:false,
           allData: '',
           searchType:'commodity'
        }
    }
    componentDidMount=()=>{
        var _this = this;
        _this.getData();
        
    }
    componentWillMount(props){
        debugger;
    }
    getData(){
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/all?goods_category=','GET',false,head,this.isLogin,this.error);
    }
    isLogin=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        _this.setState({
            data : res.data.data,
            allData: res.data
        })
    }
    searchBtn(e){
        debugger
        var _this = this;
        var target = e.target;
        var select = target.ownerDocument.querySelector('.searchSelect');
        var id = select.options[select.selectedIndex].getAttribute('id');
        var searchValue = target.ownerDocument.querySelector('.searchValue').value;
        if(searchValue==''){
            return;
        }
        var url = this.state.allData.path+'?'+id+'='+searchValue;
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'GET',false,head,this.isLogin,this.error);
    }
    clear(e){
        e.target.ownerDocument.querySelector('.searchValue').value = '';
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(this.state.allData.path,'GET',false,head,this.isLogin,this.error);
    }
    searchType(e){
        //搜索功能
        var _this = this;
        var type = e.target.querySelectorAll('option')[e.target.selectedIndex].id;
        _this.setState({
            searchType:type
        })
    }
    dateChange(e){
        //日期搜索
        var month = e.target.value;
        if(month==''){
            return;
        }
        var date_start = new Date(new Date(month).setDate(1)).toLocaleDateString();
        var date_end =  new Date(new Date(new Date(month).getFullYear(),new Date(month).getMonth()+1,1)-1000*60*60*24).toLocaleDateString()
        var url = this.state.allData.path+'?'+'date_start='+date_start+'&date_end='+date_end;
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'GET',false,head,this.isLogin,this.error);
    }
    render() {
        var _this = this;
        return (
            <div className='allStock'>
                <NavHeader />
                <CommonLeftMenu/>
                <div className='rightContent'>
                <header className="rightHeader">
                		<span>全部商品库存</span>
                	</header>
                	<div className="dataContent">
                        <div className="optContent">
                            <div className="DateOpt opt" style={{display:_this.state.searchType=='date'?'flex':'none'}}>
                                <input className="startDate DateInput" type="date"/>
                                &nbsp;-&nbsp;
                                <input className="endDate DateInput" type="date"/>
                                <div className="enterBtn" onClick={_this.dateChange.bind(_this)}>确定</div>
                            </div>
                            <div className="searchOpt opt" style={{display:_this.state.searchType=='commodity'?'flex':'none'}}>
                                <select className="searchSelect">
                                    <option id="goods_name">商品名称</option>
                                    <option id="goods_number">商品编号</option>
                                </select>
                                <input className="searchValue"/>
                                <div className="enterBtn" onClick={_this.searchBtn.bind(_this)}>搜索</div>
                                <div className="enterBtn clear" onClick={_this.clear.bind(_this)}>重置</div>
                            </div>
                        </div>
                        <CommonContent 
                            HEAD={[{title:'供货商',name:'supplier'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'工费类型',name:'goods_type'},{title:'克重(件/g)',
                                    name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'}]}
                            CONTENT={_this.state.data}
                            deleteFlag={_this.state.deleteFlag}
                            AllData = {_this.state.allData}
                        />
                        <PageFooter CONTENT={_this.state.allData} isLogin={_this.isLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}
