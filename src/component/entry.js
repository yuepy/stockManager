import React, {Component} from 'react';
import 'pageStyle/common/entry.less';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class Entry extends Component{
    constructor(){
        super();
        this.state={
            currentDate:'',
            rownum:''
        }
    }
    save(elem){
         //保存提交数据
        var _this = this;
        var tr = elem.parentNode;
        var fromData = new FormData();
        if(!_this.props.isOutStock){
            fromData.append('supplier' ,tr.querySelector('#supplier').value);
            fromData.append('goods_name' , tr.querySelector('#goods_name').value);
            fromData.append('goods_number' , tr.querySelector('#goods_number').value);
            fromData.append('price' , tr.querySelector('#price').value);
            fromData.append('weight' , tr.querySelector('#weight').value);
            fromData.append('num' ,tr.querySelector('#num').value);
            fromData.append('weight_all' , tr.querySelector('#weight_all').value);
            fromData.append('price_all' , tr.querySelector('#price_all').value);
            //var params = 'supplier='+supplier+'&goods_name='+goods_name+'&goods_number='+goods_number+'&price='+price+'&weight='+weight+'&num='+num+'&weight_all='+weight_all+'&price_all='+price_all;
            var header = {head:'Authorization',value:'Bearer '+utils.token};
            AJAX.AJAX('http://106.12.194.98/api/goods/add','POST',fromData,header,this.success,this.error);
            return;
        }
        if(_this.props.isOutStock){
                fromData.append('customer' ,tr.querySelector('#customer').value);
                fromData.append('goods_number' , tr.querySelector('#goods_number').value);
                fromData.append('current_price' , tr.querySelector('#current_price').value);
                fromData.append('num' ,tr.querySelector('#num').value);
                fromData.append('price_all' , tr.querySelector('#price_all').value);
                fromData.append('operator' , tr.querySelector('#operator').value);
                fromData.append('goods_images' , tr.querySelector('#goods_images').value);
            //var params = 'customer='+customer+'&num='+num+'&goods_number='+goods_number+'&current_price='+current_price+'&price_all='+price_all+'&operator='+operator+'&goods_images='+goods_images;
            var header = {head:'Authorization',value:'Bearer '+utils.token};
            AJAX.AJAX('http://106.12.194.98/api/goods/reduce','POST',fromData,header,this.success,this.error);
        }
        
    }
    success(res){
        //保存成功
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        if(res.msg == '入库成功'){
            var elem = document.querySelector('.save');
            var tds = elem.querySelectorAll('td');
            [].forEach.call(tds,function(item,index){
                if(item){
                    if( index == 0 ){
                        item.textContent = '已录入';
                        item.style.backgroundColor = '#005ae0';
                        item.style.color = '#fff';
                        item.parentNode.classList.remove('save');
                        item.parentNode.classList.add('fixed');
                    }else{
                        item.querySelector('input').disabled = true;
                    }
                }
            })
            return ; 
        }
        if(res.msg == '出库成功'){
            var elem = document.querySelector('.save');
            var tds = elem.querySelectorAll('td');
            [].forEach.call(tds,function(item,index){
                if(item){
                    if( index == 0 ){
                        item.textContent = '已录入';
                        item.style.backgroundColor = '#005ae0';
                        item.style.color = '#fff';
                        item.parentNode.classList.remove('save');
                        item.parentNode.classList.add('fixed');
                    }else{
                        item.querySelector('input').disabled = true;
                    }
                }
            })
            return;
        }
        if(res.msg.indexOf('成功') == -1){
            if(res.msg.indexOf('查询不到') !=-1){
                alert('第'+document.querySelector('.save').rowIndex+'条数据 [ 商品编号 ]'+res.msg);
                return;
            }
            alert('第'+document.querySelector('.save').rowIndex+'条数据'+res.msg);
        }
    }
    error(res){
        alert(res.msg);
    }
    componentDidMount(){
        //页面初始化需要渲染的数据
        var _this = this;
        _this.getCurrentDate();
        if(document && document.querySelectorAll('.disabled')){
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
        if(e.target == undefined){
            e.target = e;
        }
        if(e.target.nodeName != 'INPUT' || e.target.className =='upload_file'){
            return;
        }
        _this.setState({
            rownum:e.target.parentNode.parentNode.rowIndex
        })
        _this.isShowSave(e.target); // 判断当前数据是否填满 满足提交条件
        if(!_this.props.isOutStock){
            switch(e.target.id){
                case 'price':_this.autoMerge(e.target,'price');break;
                case 'weight':_this.autoMerge(e.target,'weight');break;
                case 'num':_this.autoMerge(e.target,'num');break;
            }
        }
        
    }
    autoMerge(elem,name){
        //自动计算表格结果
        if(!elem || !name ){
            return;
        }
        var _this = this;
        var tr = elem.parentNode.parentNode;
        if(name == 'price'){
            if(tr.querySelector('#price').value == ''){
                tr.querySelector('#price_all').value = '';
                return ;
            }
            if(tr.querySelector('#num').value == ''){
                return ;
            }
            var price = parseInt(tr.querySelector('#price').value);
            var weight_all = parseInt(tr.querySelector('#weight_all').value);
            var total = weight_all*price;
            tr.querySelector('#price_all').value = total;
            _this.isShowSave(tr.querySelector('#price_all'));
        }
        if(name == 'weight'){
            if(tr.querySelector('#weight').value == ''){
                tr.querySelector('#weight_all').value = '';
                tr.querySelector('#price_all').value = '';
                return;
            }
            if(tr.querySelector('#num').value == ''){
                return ;
            }
            var weight = parseInt(tr.querySelector('#weight').value);
            var num = parseInt(tr.querySelector('#num').value);
            var total = weight*num;
            tr.querySelector('#weight_all').value = total;
            _this.isShowSave(tr.querySelector('#weight_all'))
            if(tr.querySelector('#price').value == ''){
                return ;
            }
            var price = parseInt(tr.querySelector('#price').value);
            var money = price * total;
            tr.querySelector('#price_all').value = money;
            _this.isShowSave(tr.querySelector('#weight_all'));
        }
        if(name == 'num'){
            if(tr.querySelector('#num').value == ''){
                tr.querySelector('#weight_all').value = '';
                tr.querySelector('#price_all').value = '';
                return;
            }
            if(tr.querySelector('#weight').value == ''){
                return;
            }
            var weight = parseInt(tr.querySelector('#weight').value);
            var num = parseInt(tr.querySelector('#num').value);
            var total = weight*num;
            tr.querySelector('#weight_all').value = total;
            if(tr.querySelector('#price').value == ''){
                return ;
            }
            var price = parseInt(tr.querySelector('#price').value);
            var money = price * total;
            tr.querySelector('#price_all').value = money;
            _this.isShowSave(tr.querySelector('#weight_all'));
        }
    }
    isShowSave(elem){
        //效验当前行时候满足提交条件
        var _this = this;
        var tr = elem.parentNode.parentNode;
        var tds = tr.querySelectorAll('td');
        if(tr.classList.contains('save')){
            return;
        }
        var isDone = false;
        for(let i=1;i<tds.length;i++){
            debugger;
            if(tds[i].querySelector('input').value == '' && tds[i].querySelector('input').id != 'goods_images' &&  tds[i].querySelector('input').className != 'upload_file'){
                isDone = false;
                tds[0].style.backgroundColor = '#fff';
                return;
            }else{
                isDone = true;
            }
        }
        if(isDone){
            tds[0].parentNode.classList.add('save');
            setTimeout(() => {
                if(document.querySelector('.save')&& document.querySelector('.save').querySelector('#goods_images')&&document.querySelector('.save').querySelector('#goods_images').value == ''){
                    var isImages = confirm('第'+document.querySelector('.save').rowIndex+'数据未上传商品图片,是否继续提交');
                    if(!isImages){
                        return;
                    }
                }
                if(_this.state.rownum == document.querySelector('.save').rowIndex){
                    var timer1 = setTimeout(function(){
                        _this.save(tds[0]);
                    },3000)
                }else{
                    _this.save(tds[0]);
                }
            },3000);
        }
    }
    uploadClick(e){
        //代理触发上传图片input
        e.target.parentNode.querySelector('.upload_file').click();
    }
    upload(e){
        //图片上传 . 
        var _this = this;
        var fromData = new FormData();
        fromData.append('image',e.target.files[0]);
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        document.querySelector('#file_name').textContent = e.target.files[0].name;
        AJAX.AJAX('http://106.12.194.98/api/upload/image',"POST",fromData,head,this.successUpload,this.errorUpload);
    }
    successUpload=(res)=>{
        var _this = this;
        res = JSON.parse(res);
        if(res.msg == '身份失效'){
            window.location.href = '/';
        }
        if(res.msg == '成功'){
            document.querySelector('#goods_images').value = res.data;
            _this.entryChange(document.querySelector('#goods_images'));
        }else{
            document.querySelector('#file_name').textContent = '上传图片';
        }
    }
    errorUpload(){
        alert('上传失败!');
    }
    render(){
        var _this = this;
        var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; // 表示第一次渲染多少行空表格 (待录入数据)
        return(
            <div className='entryContent'>
                <div className='content'>
                    <div className='close' onClick={this.props.close}></div>
                    <div className='pageTitle'><h1>{_this.props.isOutStock?'商品库存 - 出库录入界面':'商品库存 - 入库录入界面'}</h1></div>
                    <table>
                        <thead>
                            <tr>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                        return <th>{item.title}</th>
                    })}
                            </tr>
                        </thead>
                        <tbody>
                            {arr.map((k,i)=>{
                                return <tr data-index={k} onChange={_this.entryChange.bind(_this)}>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                                return item.title == '状态' ?<td style={{width:'60px',textAlign:'centent'}} id={item.name}>{item.name}</td>:
                                (item.title == '日期' ? <td><input type='date' name={item.name} defaultValue={_this.state && _this.state.currentDate} id={item.name} /></td>:
                                 (item.title == '总计克重(g)' || (item.title == '总价($)' && !_this.props.isOutStock )?<td><input type='text' className='disabled'  name={item.name}  id={item.name}/></td>:
                                 (item.title == '商品图片'?<td><input type='file' onChange={_this.upload.bind(_this)}  style={{display:"none"}} className='upload_file'/><input type='text' name={item.name}  id={item.name} style={{display:"none"}}/><span onClick={_this.uploadClick.bind(_this)} id='file_name'>上传图片</span></td>:
                                 <td><input type='text' name={item.name}  id={item.name}/></td>))) 
                                })}
                            </tr>})}
                        </tbody>
                    </table>
                    {/* <div className='footer_bth'><button className='save' onClick={_this.save}>保存</button><button className='save_close'>保存并关闭</button></div> */}
                </div>
            </div>
        )
    }
}