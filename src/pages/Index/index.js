import React, {Component} from 'react';
import 'pageStyle/common/common.less'
import CommonLeftMenu from 'component/commonLeftMenu.js';
import NavHeader from 'component/header.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import CommonContent from 'component/commonContent.js';
import PageFooter from 'component/footer.js';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : '',
           deleteFlag:false,
           allData: ''
        }
    }
    componentDidMount=()=>{
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/all','GET',false,head,this.isLogin,this.error);
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
    selectDelete(){
        var _this = this;
        _this.setState({
            deleteFlag:!_this.state.deleteFlag
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
    render() {
        var _this = this;
        return (
            <div className='allStock'>
                <NavHeader />
                <CommonLeftMenu />
                <div className='rightContent'>
                <header className="rightHeader">
                		<span>全部商品库存</span>
                	</header>
                	<div className="dataContent">
                		<div className="optContent">
                            <select className="searchSelect">
                                <option id="supplier">供货商</option>
                                <option id="goods_name">商品种类</option>
                                <option id="goods_number">商品编号</option>
                            </select>
                            <input className="searchValue"/>
                            <div className="enterBtn" onClick={_this.searchBtn.bind(_this)}>搜索</div>
                            <div className="enterBtn clear" onClick={_this.clear.bind(_this)}>重置</div>
                			<div className="enterBtn lastBtn" onClick={_this.selectDelete.bind(_this)}>批量删除</div>
                		</div>
                        <CommonContent 
                            HEAD={[{title:'供货商',name:'supplier'},{title:'商品种类',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'克重(件/g)',
                                    name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'},{title:'操作',name:'删除'}]}
                            CONTENT={_this.state.data}
                            deleteFlag={_this.state.deleteFlag}
                        />
                        <PageFooter CONTENT={_this.state.allData} isLogin={_this.isLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}