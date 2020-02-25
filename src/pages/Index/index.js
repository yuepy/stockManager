import React, {Component} from 'react';
import 'pageStyle/index.less';
import CommonLeftMenu from 'component/commonLeftMenu.js';
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
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        this.setState({
            data : res.data.data
        }) 
    }
    loadData=(data)=>{
        if(!this.state.data){
            return <div>暂无数据</div>
        }
        return <tbody>
            {this.state.data.map((item,index)=>{
                return
                <tr>
                    <td>{item.id}</td>
                    <td>{item.goods_id}</td>
                    <td>{item.num}</td>
                    <td>{item.goods_name}</td>
                    <td>{item.weight}</td>
                    <td>{item.weight_all}</td>
                    <td>{item.create_time}</td>
                    <td>{item.update_time}</td>
                    <td>{item.supplier_id}</td>
                    <td>{item.supplier}</td>
                    <td>{item.goods_number}</td>
                    <td>{item.price}</td>
                </tr>
            })}
        </tbody>
    }
    render() {
        return (
            <div className='allStock'>
                <CommonLeftMenu />
                <div className='rightContent'>
                    <div className='right'>
                        <div className='content'>
                            <table className='data'>
                                <thead>
                                    <th>供货商</th>
                                    <th>商品种类</th>
                                    <th>商品编号</th>
                                    <th>克重(件/g)</th>
                                    <th>总计件数</th>
                                    <th>总计克重(g)</th>
                                </thead>
                                <tbody>
                                    {this.loadData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}