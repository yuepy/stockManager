import React, {Component} from 'react';
import 'pageStyle/index.less';
import CommonLeftMenu from 'component/commonLeftMenu.js';
import NavHeader from 'component/header.js';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data : ''
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
    render() {
        var _this = this;
        return (
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
                            <table className='data'>
                                <thead>
                                    <tr>
                                        <th>供货商</th>
                                        <th>商品种类</th>
                                        <th>商品编号</th>
                                        <th>克重(件/g)</th>
                                        <th>总计件数</th>
                                        <th>总计克重(g)</th>
                                    </tr>
                                </thead>
                                <tbody>{_this.state.data.length>0 && _this.state.data.map((item,index)=>{
                                    return <tr>
                                        <td>{item.supplier}</td>
                                        <td>{item.goods_name}</td>
                                        <td>{item.goods_number}</td>
                                        <td>{item.weight}</td>
                                        <td>{item.num}</td>
                                        <td>{item.weight_all}</td>
                                    </tr>
                                })}</tbody>
                            </table>
                    </div>
                </div>
            </div>
        )
    }
}