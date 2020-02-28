import React, {Component} from 'react';
import NavHeader from 'component/header.js';
import CommonLeftMenu from 'component/commonLeftMenu.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import PageFooter from 'component/footer.js';
import CommonContent from 'component/commonContent.js';
import 'pageStyle/common/common.less'
export default class StockHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : '',
           allData:''
        }
    }
    componentDidMount=()=>{
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/history','GET',false,head,this.isLogin,this.error);
    }
    isLogin=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        _this.setState({
            data : res.data.data,
            allData : res.data
        })
    }
    loadData=(data)=>{
        var _this = this;
        if(!_this.state.data){
            return (<div>暂无数据</div>)
        }
        debugger;
        _this.state.data.map(function(item,index){
            return<tr>123</tr>
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
        var url = 'http://106.12.194.98/api/goods/history?'+id+'='+searchValue;
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'GET',false,head,this.isLogin,this.error);
    }
    dateChange(e){

    }
    clear(e){
        e.target.ownerDocument.querySelector('.searchValue').value = '';
    }
    render(){
        var _this = this;
        return(
            <div className='allStock'>
                <NavHeader />
                <CommonLeftMenu />
                <div className='rightContent'>
                <header className="rightHeader">
                		<span>商品出库记录</span>
                	</header>
                	<div className="dataContent">
                		<div className="optContent">
                			<select className="searchSelect">
            					<option id="customer">客户名称</option>
            					<option id="goods_name">商品名称</option>
            					<option id="goods_number">商品编号</option>
            				</select>
            				<input className="searchValue"/>
                			<div className="enterBtn" onClick={_this.searchBtn.bind(_this)}>搜索</div>
                			<div className="enterBtn clear" onClick={_this.clear.bind(_this)}>清空</div>
                			<input className="dateValue lastBtn" onClick={_this.dateChange.bind(_this)} type="month"/>
                		</div>
                        <CommonContent 
                            HEAD={[{title:'日期',name:'create_time'},{title:'客户名称',name:'customer'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'单价(1g)',
                                    name:'weight'},{title:'当前银价(1g)',name:'current_price'},{title:'商品重量',name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'},
                                    {title:'总价($)',name:'price_all'},{title:'经办人',name:'operator'}]}
                            CONTENT={_this.state.data}
                        />
                        <PageFooter CONTENT={_this.state.allData} isLogin={this.isLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}