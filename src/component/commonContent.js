import React, {Component} from 'react';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class CommonContent extends Component{
    render(){
        var _this = this;
        return(
            <table className='data'>
                <thead>
                    <tr>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                        return <th>{item.title}</th>
                    })}
                    </tr>
                </thead>
                <tbody>{_this.props.CONTENT.length>0 && _this.props.CONTENT.map((item,index)=>{
                    return <tr>{_this.props.HEAD.map((v,i)=>{
                        if(v.name == 'create_time'){
                            var date = new Date();
                            var time = date.getFullYear(1582177466) +'-'+ (date.getMonth(1582177466)+1) +'-'+ date.getDate(1582177466);
                        }
                        return <td>{v.name != 'create_time' ? item[v.name]: time}</td>
                    })}
                    </tr>
                })}</tbody>
            </table>
        )
    }
}