import React, {Component} from 'react';
import 'pageStyle/common/common.less';
import CommonLeftMenu from 'component/commonLeftMenu.js';
import CommonContent from 'component/commonContent';
import NavHeader from 'component/header.js';
import PageFooter from 'component/footer.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class Warehousing extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : ''
        }
    }
    componentDidMount=()=>{
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/add/history','GET',false,head,this.isLogin,this.error);
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
                			<div className="enterBtn">商品录入</div>
                		</div>
                		<CommonContent 
                            HEAD={[{title:'日期',name:'create_time'},{title:'供应商',name:'customer'},{title:'商品名称',name:'goods_name'},{title:'商品编号',name:'goods_number'},
                            {title:'进货价格(1g)',name:'price'},{title:'商品重量(件/g)',name:'weight'},{title:'总计件数',name:'num'},
                            {title:'总计克重(g)',name:'weight_all'},{title:'总价($)',name:'price_all'}]}
                            CONTENT={_this.state.data}
                        />
                		<PageFooter />
                	</div>
                </div>
            </div>
        )
    }
}