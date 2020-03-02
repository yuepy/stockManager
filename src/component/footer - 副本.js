import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'pageStyle/common/footer.less';
import * as AJAX from 'component/AJAX.js';
import * as utils from 'component/utils.js';
export default class pageFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage:this.props.CONTENT.current_page,
            groupCount:7,
            startPage:1
        }
    }

    create(){
        var last_page = this.props.CONTENT.last_page;
        var pages = [];
        if( last_page <= this.state.groupCount){
            pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
            for(var i = 1;i <= last_page; i++){
                pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.props.CONTENT.current_page == i ? "active" : ""} key={i}>{i}</li>)
            }
            pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>) 
        }else{
            pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
            for(var i = this.state.startPage;i < this.state.startPage+this.state.groupCount;i ++){
                pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.props.CONTENT.current_page == i ? "active" : ""} key={i}>{i}</li>)
            }
            if(last_page - this.state.startPage > 7){
               pages.push(<li key={ -1 }>···</li>) 
            }
            pages.push(<li className = {this.state.currentPage == i ? "active" : ""} key={last_page} onClick = {this.goPage.bind(this,last_page)}>{last_page}</li>)
            pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>) 
        }
        

        return pages;
    }

    goPage(num){
        debugger
        var groupCount = this.state.groupCount;
        if(num % groupCount === 1 && (this.props.CONTENT.last_page - num)>this.state.groupCount){
            this.setState({
                startPage:num
            })
        }
        if(num % groupCount === 0){
            this.setState({
                startPage:num - groupCount + 1
            })
        }
        if(this.props.CONTENT.last_page - num <1){
            this.setState({
                startPage:this.props.CONTENT.last_page - groupCount,
            })
        }
        this.setState({
            currentPage:num
        })
        var url = this.props.CONTENT.last_page_url.match(/(\S*)page=/)[1];
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url+'?page='+num,'GET',false,head,this.props.isLogin,this.error);
    }

    goPrev(){
        
        var groupCount = this.state.groupCount;
        if(this.props.CONTENT.current_page==1){
            return;
        }

        var num = this.state.currentPage-1;
        if( !(num  % groupCount ) ){
            this.setState({
                startPage:this.state.currentPage - groupCount
            });
        }
        if(this.props.CONTENT.last_page-this.state.currentPage==this.state.groupCount){
            this.setState({
                startPage:Math.floor(num / this.state.groupCount) *this.state.groupCount + 1
            })
        } 
        this.setState({
            currentPage:num
        })
        var url = this.props.CONTENT.last_page_url.match(/(\S*)page=/)[1];
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url+'?page='+num,'GET',false,head,this.props.isLogin,this.error);
    }
    goNext(){
        debugger;
        var groupCount = this.state.groupCount;
        if(this.props.CONTENT.current_page==this.props.CONTENT.last_page){
            return;
        }
        var num = this.props.CONTENT.current_page+1; 
        if( !( this.state.currentPage % groupCount ) && this.props.CONTENT.last_page - this.state.currentPage > 1 ){
            if(this.props.CONTENT.last_page-this.state.currentPage<this.state.groupCount){
                this.setState({
                    startPage:this.props.CONTENT.last_page-this.state.groupCount
                });
            }else{
                this.setState({
                    startPage:num
                });
            } 
        }
        this.setState({
            currentPage:num
        })
        var url = this.props.CONTENT.last_page_url.match(/(\S*)page=/)[1];
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(this.props.CONTENT.path+'?page='+num,'GET',false,head,this.props.isLogin,this.error);
    }
    goText(e) {
        var target = e.target;
        if(target.value==''){
            return;
        }
        var num = Number(target.value);
        if(num>this.props.CONTENT.last_page){
            alert('当前页码数不能超过总页码数！');
            return;
        }
        if(this.props.CONTENT.last_page-num<=7){
            this.setState({
                startPage:this.props.CONTENT.last_page-this.state.groupCount
            })
        }else{
            this.setState({
                startPage:Math.floor(num / this.state.groupCount) *this.state.groupCount + 1
            })  
        }
            
        this.goPage(num)
    }
    render() {
        var _this = this;
        var Pages = this.create.bind(this)();
        return (
            <footer className="pageFooter">
                <ul>
                    { Pages }
                </ul>
                <span>共{_this.props.CONTENT.last_page}页</span>
                第&nbsp;<input onBlur={_this.goText.bind(_this)}/>&nbsp;页 
            </footer>
        )
    }
}