import React, {Component} from 'react';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class CommonContent extends Component{
    componentDidMount(){
        var _this = this;
        _this.setState({
            deleteFlag:this.props.deleteFlag?this.props.deleteFlag:false
        })
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
                            <input type='checkbox'/>
                        </td>{_this.props.HEAD.map((v,i)=>{
                        if(v.name == 'create_time'){
                            var date = new Date(item[v.name] * 1000);
                            var time = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
                        }
                        return <td className={v.title == '操作'? 'deleteFlag':''}>{v.name == 'create_time' ?time : (v.title == '操作' && !this.props.deleteFlag ? v.name:item[v.name])}</td>
                    })}
                    </tr>
                })}</tbody>
            </table>
        )
    }
}