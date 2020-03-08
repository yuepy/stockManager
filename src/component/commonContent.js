import React, {Component} from 'react';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class CommonContent extends Component{
    componentDidMount(){
        var _this = this;
        _this.setState({
            deleteFlag:this.props.deleteFlag?this.props.deleteFlag:false
        })
        if(location.pathname == '/warehousing'){
            _this.props.onRefFn(_this);
        }
    }
    deleteClick(e){
        var _this = this;
        var deleteId = event.target.parentNode.id;
        _this.delete(deleteId);
    }
    isConfirm(e){
        var _this = this;
        if(event.target.className !='deleteFlag'){
            return;
        }
        var isStatus = confirm('确认删除?');
        if(isStatus){
            _this.deleteClick();
        }
    }
    delete(param){
        var deleteId = '';
        if(param instanceof Array){
            for(var i =0;i<param.length;i++){
                deleteId += i == 0?param[i]:','+param[i]
            }
        }else{
            deleteId = param;
        }
        var fromData = new FormData();
        fromData.append('ids',deleteId);
        var header = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/store/delete','POST',fromData,header,this.success,this.error);
    }
    success=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        if(res.msg == '删除成功'){
            if(_this.props.deleteFlag){
                _this.props.selectDelete();
            }
            _this.props.getData();
            alert('数据删除成功!');
        }else{
            alert(res.msg);
        }
    }
    error(res){
        alert(res.msg);
    }
    checked(e){
        e.target.parentNode.parentNode.classList.add('delete');
    }
    render(){
        var _this = this;
        return(
            <table className='data'>
                <thead>
                    <tr><th className={_this.props.deleteFlag?'showInput':'hideInput'}>选择</th>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                        return <th>{item.title}</th>
                    })}
                    </tr>
                </thead>
                <tbody>{_this.props.CONTENT.length>0 && _this.props.CONTENT.map((item,index)=>{
                    return <tr id={item.id}>
                        <td className={_this.props.deleteFlag?'showInput':'hideInput'}>
                            <input type='checkbox' onChange={_this.checked.bind(_this)}/>
                        </td>{_this.props.HEAD.map((v,i)=>{
                        if(v.name == 'create_time'){
                            var date = new Date(item[v.name] * 1000);
                            var time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
                        }
                        if(v.title == '商品图片' ){
                            var imgURL = item[v.name] && item[v.name].length > 0 ? item[v.name][0] : false;
                        }
                    return <td className={v.title == '操作'? 'deleteFlag':''} onClick={_this.isConfirm.bind(_this)}>{v.name == 'create_time' ?time : 
                    (v.title == '操作' && !this.props.deleteFlag ? v.name:(v.title=='商品图片'?<a target='_blank' href={imgURL?imgURL:''}>{imgURL?item.goods_name+'图片':'无商品图片'}</a>:
                    (v.title == '工费类型'?(item[v.name] == '1'?'件工费':'克工费'):item[v.name])))}</td>
                    })}
                    </tr>
                })}</tbody>
                <tbody className="total">
                    <tr>
                        <td className={_this.props.deleteFlag?'showInput':'hideInput'}>
                        </td>
                        {_this.props.HEAD.map((d,i)=>{
                            if(i==0){
                                var output = '合计：';
                            }else if(d.title=='总计件数'){
                                var output = _this.props.AllData.stat_num_total;
                            }else if(d.title=='总价($)'){
                                var output = _this.props.AllData.stat_price_total;
                            }else if(d.title=='总计克重(g)'){
                                var output = _this.props.AllData.stat_weight_total;
                            }else{
                                var output = '';
                            }
                            return <td>{output}</td>
                        })}
                    </tr>
                </tbody>
            </table>
        )
    }
}