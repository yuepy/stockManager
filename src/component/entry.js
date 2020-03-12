import React, {Component} from 'react';
import 'pageStyle/common/entry.less';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class Entry extends Component{
    constructor(){
        super();
        this.state={
            currentDate:'',
            rownum:'',
            trID:'',
            nullSupplierORCustomer:false
        }
    }
    save(elem){
         //保存提交数据
        var _this = this;
        var tr = elem.parentNode;
        var fromData = new FormData();
        if(!_this.props.isOutStock){
            fromData.append('supplier' ,tr.querySelector('#supplier').value);
            fromData.append('goods_category' , tr.querySelector('#goods_category').value);
            fromData.append('goods_name' , tr.querySelector('#goods_name').value);
            fromData.append('goods_number' , tr.querySelector('#goods_number').value);
            fromData.append('price' , '00');
            fromData.append('goods_type' , tr.querySelector('#goods_type').value);
            fromData.append('goods_laborcost' ,  tr.querySelector('#goods_laborcost').value);
            fromData.append('weight' , tr.querySelector('#weight').value);
            fromData.append('num' ,tr.querySelector('#num').value); 
            fromData.append('weight_all' , tr.querySelector('#weight_all').value);  
            fromData.append('price_all' , tr.querySelector('#price_all').value);
            fromData.append('operator' , tr.querySelector('#operator').value);
            //var params = 'supplier='+supplier+'&goods_name='+goods_name+'&goods_number='+goods_number+'&price='+price+'&weight='+weight+'&num='+num+'&weight_all='+weight_all+'&price_all='+price_all;
            var header = {head:'Authorization',value:'Bearer '+utils.token};
            AJAX.AJAX('http://106.12.194.98/api/goods/add','POST',fromData,header,this.success,this.error);
            return;
        }
        if(_this.props.isOutStock){
                fromData.append('customer' ,tr.querySelector('#customer').value);
                fromData.append('goods_number' , tr.querySelector('#goods_number').value);
                fromData.append('current_price' , '0.0000001');
                fromData.append('num' ,tr.querySelector('#num').value);
                fromData.append('price_all' , tr.querySelector('#price_all').value);
                fromData.append('operator' , tr.querySelector('#operator').value);
                fromData.append('goods_type' , tr.querySelector('#goods_type').value);
                fromData.append('weight' , tr.querySelector('#weight').value);
                //fromData.append('category' , tr.querySelector('#category').value);
                fromData.append('goods_laborcost' , tr.querySelector('#goods_laborcost').value);
                fromData.append('weight_all' , tr.querySelector('#weight_all').value);
                //fromData.append('goods_images' , tr.querySelector('#goods_images').value);
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
            switch(e.target.id){
                case 'price':_this.autoMerge(e.target,'price');break;
                case 'weight':_this.autoMerge(e.target,'weight');break;
                case 'weight_all':_this.autoMerge(e.target,'weight_all');break;
                case 'num':_this.autoMerge(e.target,'num');break;
                case 'goods_laborcost':_this.autoMerge(e.target,'goods_laborcost');break;
                case 'current_price':_this.autoMerge(e.target,'price');break;
            }
    }
    autoMerge(elem,name){
        //自动计算表格结果
        if(!elem || !name ){
            return;
        }
        var _this = this;
        var tr = elem.parentNode.parentNode;
        var goods_laborcost = window.isNaN(parseFloat(tr.querySelector('#goods_laborcost').value))?'':parseFloat(tr.querySelector('#goods_laborcost').value);
        var num = window.isNaN(parseFloat(tr.querySelector('#num').value))?'':parseFloat(tr.querySelector('#num').value);
        var weight = window.isNaN(parseFloat(tr.querySelector('#weight').value))?'':parseFloat(tr.querySelector('#weight').value);
        var weight_all = window.isNaN(parseFloat(tr.querySelector('#weight_all').value))?'':parseFloat(tr.querySelector('#weight_all').value);
        var price = !tr.querySelector('#price') ?0:!this.props.isOutStock?parseFloat(tr.querySelector('#price').value):(!tr.querySelector('#current_price') ? 0 : parseFloat(tr.querySelector('#current_price').value));
        price = window.isNaN(price)?'' : price;
        var price_all = window.isNaN(parseFloat(tr.querySelector('#price_all').value))?'':parseFloat(tr.querySelector('#price_all').value);
        if(tr.querySelector('#goods_type').value == '1'){
            if(name == 'price' ){
                if(price == '' ){
                    tr.querySelector('#price_all').value = '';
                    return ;
                }
                if(num == '' || goods_laborcost == ''){
                    return ;
                }
                tr.querySelector('#price_all').value = (weight_all*price + num * goods_laborcost).toFixed(2);
                _this.isShowSave(tr.querySelector('#price_all'));
            }
            if(name == 'num' || name == 'weight'){
                if(num == '' || weight == ''){
                    tr.querySelector('#weight_all').value = '';
                    tr.querySelector('#price_all').value = '';
                    return;
                }
                var total = weight*num;
                tr.querySelector('#weight_all').value = total;
                _this.isShowSave(tr.querySelector('#weight_all'))
                if(price === '' || goods_laborcost == ''){
                    return ;
                }
                tr.querySelector('#price_all').value = (price * total + num * goods_laborcost).toFixed(2);
                _this.isShowSave(tr.querySelector('#price_all'));
            }
            if(name == 'goods_laborcost'){
                // 工费 * 数量 + (数量 * 商品重量 = 总克重) * 单价 = 总价
                if( goods_laborcost == '' || weight_all == ''){
                    tr.querySelector('#price_all').value = '';
                    return;
                }
                tr.querySelector('#price_all').value = ((goods_laborcost*num) + (num * weight * price)).toFixed(2);
                _this.isShowSave(tr.querySelector('#price_all'))
            }
        }
        if(tr.querySelector('#goods_type').value == '2'){
            if(name == 'price' || name == 'weight_all' || name == 'goods_laborcost'){
                if(price === ''  || weight_all == '' || goods_laborcost == ''){
                    tr.querySelector('#price_all').value = '';
                    return ;
                }
                tr.querySelector('#price_all').value = (price * weight_all + weight_all*goods_laborcost).toFixed(2);
                _this.isShowSave(tr.querySelector('#price_all'));
            }
            
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
        var type = tr.querySelector('#goods_type').value;
        for(let i=1;i<tds.length;i++){
            if(tds[i].querySelector('input').value == '' && tds[i].querySelector('input').id != 'goods_images' &&  tds[i].querySelector('input').className != 'upload_file') {
                if(tds[i].querySelector('input').value == '' && tds[i].querySelector('input').id == 'weight' && type == '2'){
                    isDone = true;
                    continue;
                }
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
                // if(document.querySelector('.save')&& document.querySelector('.save').querySelector('#goods_images')&&document.querySelector('.save').querySelector('#goods_images').value == ''){
                //     var isImages = confirm('第'+document.querySelector('.save').rowIndex+'数据未上传商品图片,是否继续提交');
                //     if(!isImages){
                //         return;
                //     }
                // }
                if(_this.state.rownum == document.querySelector('.save').rowIndex){
                    var timer1 = setTimeout(function(){
                        _this.save(tds[0]);
                    },1000)
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
    selectType(dom){
        //选择商品工费类型
        var _this = this;
        var dataDom = '';
        if(dom.target){
            event.target.parentNode.querySelector('input').value = event.target.value;
            var tr = event.target.parentNode.parentNode;
            dataDom = event.target;
        }else{
            dataDom = dom;
            var tr = dom.parentNode.parentNode;
        }
        if(dataDom.value == '1'){
            tr.querySelector('#weight').disabled = false;
            tr.querySelector('#weight_all').disabled = true;
            if(tr.querySelector('#weight').classList.contains('disabled')){
                tr.querySelector('#weight').classList.remove('disabled');
                tr.querySelector('#weight_all').classList.add('disabled')
            }else{
                tr.querySelector('#weight_all').classList.add('disabled')
            }
        }else{
            tr.querySelector('#weight').value = '';
            tr.querySelector('#weight').disabled = true;
            tr.querySelector('#weight_all').disabled = false;
            if(tr.querySelector('#weight_all').classList.contains('disabled')){
                tr.querySelector('#weight_all').classList.remove('disabled');
                tr.querySelector('#weight').classList.add('disabled')
            }else{
                tr.querySelector('#weight').classList.add('disabled');
            }
        }
        _this.isShowSave(dataDom.parentNode.querySelector('input'));

    }
    entryBlur(e){
        //输入商品编号带出数据
        var _this = this;
        if(e.target.id != 'goods_number' || e.target.value.replace(/\s/,'') == ''){
            return ;
        }
        var tr = event.target.parentNode.parentNode;
        var goods_number  = tr.querySelector('#goods_number').value;
        _this.setState({
            trID:(parseInt(tr.dataset.index)-1)
        })
        var header = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX('http://106.12.194.98/api/goods/all?goods_number='+goods_number,'GET',false,header,_this.getEntryData,_this.error);
    }
    getEntryData=(res)=>{
        //获取对应编号库存并填充
        var _this = this;
        res = JSON.parse(res);
        var data = res.data.data[0];
        if(!data){
            return;
        }
        var tr = document.querySelector('.entryContent').querySelector('tbody').querySelectorAll('tr')[this.state.trID];
        if(!this.props.isOutStock){
            tr.querySelector('#goods_type').value = data.goods_type;
            tr.querySelector('#goods_type').nextElementSibling.value = data.goods_type;
            if(data.goods_type == '1'){
                tr.querySelector('#weight').value = data.weight;
            }
            tr.querySelector('#goods_category').value = data.category;
            tr.querySelector('#goods_name').value = data.goods_name;
            tr.querySelector('#goods_laborcost').value = data.laborcost;
            tr.querySelector('#supplier').value = data.supplier;
        }else{
            tr.querySelector('#num').placeholder = data.num;
            tr.querySelector('#goods_type').value = data.goods_type;
            tr.querySelector('#goods_type').nextElementSibling.value = data.goods_type;
            if(data.goods_type == '1'){
                tr.querySelector('#weight').value = data.weight;
            }
            tr.querySelector('#weight_all').placeholder = data.weight_all;
            tr.querySelector('#goods_laborcost').placeholder = data.laborcost;
        }
        _this.selectType(tr.querySelector('#goods_type'));
    }
    selectSupplier(e){
        //选择供应商
        e.target.parentNode.querySelector('input').value = e.target.value;
    }
    getSupplier(name){
        //渲染全部供应商
        var _this = this;
        return <td>
            <input type='text' style={{display:'none'}} id={name} name={name} />
            <select onChange={_this.selectSupplier.bind(_this)}>
                <option value =''>{!_this.props.isOutStock?'请选择供应商':'请选择出货客户'}</option>
                {_this.props && _this.props.supplier != '' && _this.props.supplier.map((item,index)=>{
                    return <option value ={item.nam}>{item.name}</option>
                }) }
            </select>
        </td>
    }
    randomWord(randomFlag, min, max){
        //随机生成指定区间位数字符0-9 A-Z 或者指定位数  randomFlag判断位数是否指定
        var _this = this;
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            var pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        event.target.parentNode.querySelector('input').value = str;
        // return str;
        _this.isShowSave(event.target.parentNode.querySelector('input'));
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
                                return <tr data-index={k} onChange={_this.entryChange.bind(_this)} onBlur={_this.entryBlur.bind(_this)}>{_this.props.HEAD.length>0 && _this.props.HEAD.map((item,index)=>{
                                return item.title == '状态' ?<td style={{width:'60px',textAlign:'centent'}} id={item.name}>{item.name}</td>:
                                (item.title == '日期' ? <td><input type='date' name={item.name} defaultValue={_this.state && _this.state.currentDate} id={item.name} /></td>:
                                 (item.title == '总计克重(g)' || (item.title == '合计价钱($)')|| (item.title == '工费总价($)')|| (item.title == '合计克重(g)')?<td ><input type='text'  name={item.name}  id={item.name} className='disabled'/></td>:
                                 (item.title == '商品图片'?<td><input type='file' onChange={_this.upload.bind(_this)}  style={{display:"none"}} className='upload_file'/>
                                 <input type='text' name={item.name}  id={item.name} style={{display:"none"}}/><span onClick={_this.uploadClick.bind(_this)} id='file_name'>上传图片</span></td>:
                                 (item.title == '工费类型' ? <td><input type='text' style={{display:'none'}} id={item.name} name={item.name} defaultValue='1'/>
                                 <select onChange={_this.selectType.bind(_this)}><option value='1'>件</option><option value='2'>克</option></select></td>:
                                 ( item.title== '供应商'?_this.getSupplier(item.name):
                                 (item.title == '商品编号' && !_this.props.isOutStock?<td className='number'><input type='text' name={item.name}  id={item.name}/><button onClick={_this.randomWord.bind(_this,true,6,8)}>生成</button></td>:
                                 (item.title == '客户名称' && _this.props.isOutStock?_this.getSupplier(item.name):
                                 <td><input type='text' name={item.name}  id={item.name}/></td>))))))) 
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