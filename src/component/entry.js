import React, {Component} from 'react';
import 'pageStyle/common/entry.less';
import * as AJAX from 'component/AJAX.js';
export default class Entry extends Component{
    save(e){
         this.state={
             currentDate:''
         }
    }
    componentDidMount(){
        //页面初始化需要渲染的数据
        var _this = this;
        _this.getCurrentDate();
        if(document.querySelectorAll('.disabled')){
            var elem = document.querySelectorAll('.disabled');
            for(var i = 0;i<elem.length;i++){
                elem[i].disabled = true;
            }
        }
    }
    getCurrentDate(){
        //获取当前时间
        var _this = this;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        _this.setState({
            currentDate:year+'-'+month+'-'+day
        })
        return year+'-'+month+'-'+day;
    }
    entryChange(e){
        //表格录入数据逻辑
        var _this = this;
        if(e.target.nodeName != 'INPUT'){
            return;
        }
        this.isShowSave(e.target); // 判断当前数据是否填满 满足提交条件
        switch(e.target.id){
            case 'price':_this.autoMerge(e.target,'price');break;
            case 'weight':_this.autoMerge(e.target,'weight');break;
            case 'num':_this.autoMerge(e.target,'num');break;
        }
        
    }
    autoMerge(elem,name){
        //自动计算表格结果
        if(!elem || !name || elem.value == ''){
            return;
        }
        var _this = this;
        var tr = elem.parentNode.parentNode;
        if(name == 'price'){
            if(tr.querySelector('#num').value == ''){
                return ;
            }
            var price = parseInt(tr.querySelector('#price').value);
            var weight_all = parseInt(tr.querySelector('#weight_all').value);
            var total = weight_all*num;
            tr.querySelector('#price_all').value = total;
        }
        if(name == 'weight'){
            if(tr.querySelector('#num').value == ''){
                return ;
            }
            var weight = parseInt(tr.querySelector('#weight').value);
            var num = parseInt(tr.querySelector('#num').value);
            var total = weight*num;
            tr.querySelector('#weight_all').value = total;
        }
        if(name == 'num'){
            if(tr.querySelector('#weight').value == ''){
                return;
            }
            var weight = parseInt(tr.querySelector('#weight').value);
            var num = parseInt(tr.querySelector('#num').value);
            var total = weight*num;
            tr.querySelector('#weight_all').value = total;
        }
    }
    isShowSave(elem){
        //效验当前行时候满足提交条件
        var _this = this;
        var tr = elem.parentNode.parentNode;
        var tds = tr.querySelectorAll('td');
        var isDone = false;
        for(let i=1;i<tds.length;i++){
            if(tds[i].querySelector('input').value == ''){
                isDone = false;
                tds[0].style.backgroundColor = '#fff';
                return;
            }else{
                isDone = true;
            }
        }
        if(isDone){
            tds[0].style.backgroundColor = '#aaa';
            tds[0].parentNode.classList.add('save');
        }
    }
    render(){
        var _this = this;
        var arr = [1,2,3,4,5,6,7,8,9,10,11,12]; // 表示第一次渲染多少行空表格 (待录入数据)
        return(
            <div className='entryContent'>
                <div className='content'>
                    <div className='close' onClick={this.props.close}>X</div>
                    <div className='pageTitle'><h1>商品库存 - 录入界面</h1></div>
                    <table>
                        <thead>
                            <tr>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                        return <th>{item.title}</th>
                    })}
                            </tr>
                        </thead>
                        <tbody>
                            {arr.map((k,i)=>{
                                return <tr data-index={k} onBlur={_this.entryChange.bind(_this)}>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                                return item.title == '序列号' ?<td style={{width:'60px',textAlign:'centent'}} id={item.name}>{i+1}</td>:
                                (item.title == '日期' ? <td><input type='date' name={item.name} defaultValue={_this.state && _this.state.currentDate} id={item.name} /></td>:
                                 (item.title == '总计克重(g)' || item.title == '总价($)'?<td><input type='text' className='disabled'  name={item.name}  id={item.name}/></td>:
                                 <td><input type='text' name={item.name}  id={item.name}/></td>)) 
                                })}
                            </tr>})}
                        </tbody>
                    </table>
                    <div className='footer_bth'><button className='save' onClick={_this.save}>保存</button><button className='save_close'>保存并关闭</button></div>
                </div>
            </div>
        )
    }
}