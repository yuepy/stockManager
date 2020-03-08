import React, {Component} from 'react';
import 'pageStyle/common/common.less'
import CommonLeftMenu from 'component/commonLeftMenu.js';
import NavHeader from 'component/header.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
import CommonContent from 'component/commonContent.js';
import PageFooter from 'component/footer.js';
export default class Index extends Component {
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
    render(){
        var _this = this;
        return(
            <div className='allStock'>
                <NavHeader />
                <CommonLeftMenu />
                <div className='rightContent'>
                <header className="rightHeader">
                		<span>商品库存详情</span>
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
                		</div>
                    </div>
                </div>
            </div>
        )
    }
}