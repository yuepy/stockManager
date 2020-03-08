import React, {Component, Children} from 'react';
import 'pageStyle/common/common.less';
import CommonLeftMenu from 'component/commonLeftMenu.js';
import CommonContent from 'component/commonContent';
import NavHeader from 'component/header.js';
import PageFooter from 'component/footer.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import Entry from 'component/entry.js';
export default class Warehousing extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : '',
           isentry:false,
           allData:'',
           deleteFlag:false
        }
    }
    componentDidMount=()=>{
        var _this = this;
        _this.getData();
    }
    getData=()=>{
        var _this = this;
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/add/history','GET',false,head,this.isLogin.bind(_this),_this.error);
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
    error(res){
        alert(res.msg);
    }
    showEntry=()=>{
        var _this = this;
        _this.setState({
            isentry:true
        })
    }
    selectDelete=()=>{
        var _this = this;
        _this.setState({
            deleteFlag:!_this.state.deleteFlag
        })
    }
    isConfirm(){
        var _this = this;
        var isStatus = confirm('确认删除?');
        if(isStatus){
            _this.DELETE();
        }
    }
    DELETE(e){
        var deleteStaus = document.querySelector('tbody').querySelectorAll('.delete');
        if(deleteStaus.length<1){
            alert('请选择要删除数据');
            return;
        }
        var ids = [];
        for(let i=0;i<deleteStaus.length;i++){
            ids.push(deleteStaus[i].id);
        }
        this.childFn.delete(ids);
    }
    onRefFn=(ref)=>{
        //接受子组件作用域 并赋值给当前指针的childFn属性;
        var _this = this;
        _this.childFn = ref;
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
    dateChange(e){
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
    clear(e){
        e.target.ownerDocument.querySelector('.searchValue').value = '';
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(this.state.allData.path,'GET',false,head,this.isLogin,this.error);
    }
    showSupplier(){

    }
    render(){
        var _this = this;
        return(
            <div className='allStock'>
            	<NavHeader />
                <CommonLeftMenu />
                <div className='rightContent'>
                	<header className="rightHeader">
                		<span>商品库存入库</span>
                	</header>
                	<div className="dataContent">
                		<div className="optContent">
                            <select className="searchSelect">
                                <option id="goods_name">商品名称</option>
                                <option id="goods_number">商品编号</option>
                            </select>
                            <input className="searchValue"/>
                            <div className="enterBtn" onClick={_this.searchBtn.bind(_this)}>搜索</div>
                            <div className="enterBtn clear" onClick={_this.clear.bind(_this)}>重置</div>
                            <input className="dateValue lastBtn" onChange={_this.dateChange.bind(_this)} type="month"/>
                		</div>
                        <div className="optContent twoLine">
                            <div className="enterBtn2" onClick={this.showEntry}>商品录入</div>
                            <div className="enterBtn2" onClick={this.showSupplier}>供应商录入</div>
                            {_this.state.deleteFlag && <div className='enterBtn2 isDelete' onClick={_this.isConfirm.bind(_this)}>确认删除</div>}
                            <div className="enterBtn2" onClick={_this.selectDelete.bind(_this)}>{this.state.deleteFlag?'取消':'批量删除'}</div>
                        </div>      
                		<CommonContent 
                            HEAD={[{title:'日期',name:'create_time'},{title:'供应商',name:'supplier'},{title:'商品种类',name:'category'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},
                            {title:'进货价格(1g)',name:'price'},{title:'工费类型',name:'goods_type'},{title:'工费',name:'oprice'},{title:'商品重量(件/g)',name:'weight'},{title:'总计件数',name:'num'},
                            {title:'总计克重(g)',name:'weight_all'},{title:'总价($)',name:'price_all'},{title:'经办人',name:'operator'},{title:'操作',name:'删除'}]}
                            CONTENT={_this.state.data}
                            deleteFlag={_this.state.deleteFlag}
                            onRefFn = {_this.onRefFn}
                            getData={_this.getData}
                            selectDelete={_this.selectDelete}
                            AllData = {_this.state.allData}
                        />
                        {_this.state.isentry && <Entry 
                            close={()=>{_this.setState({isentry:false}); _this.getData()}}
                            isOutStock={false}
                            HEAD={[{title:'状态',name:'未录入'},{title:'供应商',name:'supplier'},{title:'种类',name:'goods_category'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},
                            {title:'进货价格(1g)',name:'price'},{title:'工费类型',name:'goods_type'},{title:'工费',name:'goods_laborcost'},{title:'商品重量(件/g)',name:'weight'},{title:'总计件数',name:'num'},
                            {title:'总计克重(g)',name:'weight_all'},{title:'总价($)',name:'price_all'},
                            {title:'经办人',name:'operator'}]}
                        />}
                		<PageFooter CONTENT={_this.state.allData} isLogin={this.isLogin}/>
                	</div>
                </div>
            </div>
        )
    }
}