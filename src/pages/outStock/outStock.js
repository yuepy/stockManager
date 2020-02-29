import React, {Component} from 'react';
import 'pageStyle/common/common.less'
import CommonLeftMenu from 'component/commonLeftMenu.js';
import NavHeader from 'component/header.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import CommonContent from 'component/commonContent.js';
import PageFooter from 'component/footer.js';
import Entry from 'component/entry.js';
export default class OutStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : '',
           deleteFlag:false,
           allData:'',
           isentry:false
        }
    }
    componentDidMount=()=>{
        var _this = this;
        _this.getData();
    }
    getData(){
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/reduce/history','GET',false,head,this.isLogin,this.error);
    }
    isLogin=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        _this.setState({
            data : res.data.data,
            allData:res.data
        })
    }
    showEntry=()=>{
        var _this = this;
        _this.setState({
            isentry:true
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
                		<span>商品库存出库</span>
                	</header>
                	<div className="dataContent">
                		<div className="optContent">
                			<div className="enterBtn" onClick={this.showEntry}>出库录入</div>
                		</div>
                        <CommonContent 
                            HEAD={[{title:'日期',name:'create_time'},{title:'客户名称',name:'customer'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'单价(1g)',
                            name:'weight'},{title:'当前银价(1g)',name:'current_price'},{title:'商品重量',name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'},
                            {title:'总价($)',name:'price_all'},{title:'经办人',name:'operator'},{title:'商品图片',name:'images'}]}
                            CONTENT={_this.state.data}
                            deleteFlag={_this.state.deleteFlag}
                        />
                        {_this.state.isentry && <Entry 
                            close={()=>{_this.setState({isentry:false}); _this.getData()}}
                            isOutStock = {true}
                            HEAD={[{title:'状态',name:'未录入'},{title:'日期',name:'create_time'},{title:'客户名称',name:'customer'},{title:'商品编号',name:'goods_number'},{title:'出货件数',name:'num'},
                            {title:'当前银价',name:'current_price'},
                            {title:'总价($)',name:'price_all'},{title:'经办人',name:'operator'},{title:'商品图片',name:'goods_images'}]}
                        />}
                        <PageFooter CONTENT={_this.state.allData} isLogin={this.isLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}