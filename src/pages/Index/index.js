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
           allData: '',
           searchType:'commodity'
        }
    }
    componentDidMount=()=>{
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/category/list','GET',false,head,this.isLogin,this.error);
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
        var date_start = e.target.ownerDocument.querySelector('.startDate').value;
        var date_end =  e.target.ownerDocument.querySelector('.endDate').value;
        var url = this.state.allData.path+'?'+'date_start='+date_start+'&date_end='+date_end;
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url,'GET',false,head,this.isLogin,this.error);
    }
    render(){
        var _this = this;
        return(
            <div className='allStock'>
                <NavHeader />
                <CommonLeftMenu />
                <div className='rightContent'>
                <header className="rightHeader">
                		<span>商品全部库存</span>
                	</header>
                	<div className="dataContent">
                    <div className="optContent">
                            {/* <div className="DateOpt opt" style={{display:_this.state.searchType=='date'?'flex':'none'}}>
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
                            </div> */}
                        </div>
                        
                        <CommonContent 
                            HEAD={[{title:'商品种类',name:'category'},{title:'工费类型',name:'goods_type'},{title:'总计件数',name:'stat_num_total'},{title:'总计克重(g)',name:'stat_weight_total'}]}
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