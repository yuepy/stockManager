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
           deleteFlag:false
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
            data : res.data.data
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
                			<div className="enterBtn" onClick={_this.selectDelete.bind(_this)}>批量删除</div>
                		</div>
                        <CommonContent 
                            HEAD={[{title:'供货商',name:'supplier'},{title:'商品种类',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'克重(件/g)',
                                    name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'},{title:'操作',name:'删除'}]}
                            CONTENT={_this.state.data}
                            deleteFlag={_this.state.deleteFlag}
                        />
                        <PageFooter />
                    </div>
                </div>
            </div>
        )
    }
}