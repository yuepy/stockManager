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
                                <option>供货商</option>
                                <option>商品名称</option>
                                <option>商品编号</option>
                            </select>
                            <input className="searchValue"/>
                            <div className="enterBtn">搜索</div>
                            <div className="enterBtn clear">清空</div>
                		</div>
                        <CommonContent 
                            HEAD={[{title:'供货商',name:'supplier'},{title:'商品种类',name:'goods_name'},{title:'商品编号',name:'goods_number'},{title:'克重(件/g)',
                                    name:'weight'},{title:'总计件数',name:'num'},{title:'总计克重(g)',name:'weight_all'}]}
                            CONTENT={_this.state.data}
                        />
                        <PageFooter CONTENT={_this.state.allData} isLogin={_this.isLogin}/>
                    </div>
                </div>
            </div>
        )
    }
}