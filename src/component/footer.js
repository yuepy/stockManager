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
            groupCount:5,
            pages:this.props.CONTENT.last_page
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.CONTENT.current_page!==nextProps.CONTENT.current_page||this.props.CONTENT.last_page!==nextProps.CONTENT.last_page){
            this.setState({
                currentPage:nextProps.CONTENT.current_page,
                pages:nextProps.CONTENT.last_page
            })
        }
    }
    create(){
        var last_page = this.state.pages;
        var currentPage = this.state.currentPage;
        var groupCount = this.state.groupCount;
        var pages = [];
        if( last_page <= this.state.groupCount+2){
            pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
            for(var i = 1;i <= last_page; i++){
                pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.state.currentPage == i ? "active" : ""} key={i}>{i}</li>)
            }
            pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>) 
        }else{
            if(currentPage<=groupCount){
                pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
                for(var i=1; i<=groupCount;i++){
                    pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.state.currentPage == i ? "active ab" : ""} key={i}>{i}</li>)
                }
                if(currentPage==groupCount){
                    pages.push(<li onClick = {this.goPage.bind(this,groupCount+1)} className = {this.state.currentPage == groupCount+1 ? "active" : ""} key={groupCount+1}>{groupCount+1}</li>)
                }
                pages.push(<li key={ -2 }>···</li>)
                pages.push(<li key={last_page} onClick = {this.goPage.bind(this,last_page)}>{last_page}</li>)
                pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>)
            }else if(currentPage>groupCount&&currentPage<=this.state.pages-groupCount){
                pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
                pages.push(<li  key={1} onClick = {this.goPage.bind(this,1)}>{1}</li>)
                pages.push(<li key={ -1 }>···</li>)
                for(var i= currentPage-2;i<=currentPage+2;i++){
                    pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.state.currentPage == i ? "active" : ""} key={i}>{i}</li>)
                }
                pages.push(<li key={ -2 }>···</li>)
                pages.push(<li key={last_page} onClick = {this.goPage.bind(this,last_page)}>{last_page}</li>)
                pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>)
            }else if(currentPage>this.state.pages-groupCount){
                pages.push(<li className="prev" onClick = {this.goPrev.bind(this)} key={0}></li>)
                pages.push(<li  key={1} onClick = {this.goPage.bind(this,1)}>{1}</li>)
                pages.push(<li key={ -1 }>···</li>)
                if(currentPage==this.state.pages-groupCount+1){
                    pages.push(<li onClick = {this.goPage.bind(this,this.state.pages-groupCount)} key={this.state.pages-groupCount}>{this.state.pages-groupCount}</li>)
                }
                for(var i=this.state.pages-groupCount+1; i<=this.state.pages;i++){
                    pages.push(<li onClick = {this.goPage.bind(this,i)} className = {this.state.currentPage == i ? "active" : ""} key={i}>{i}</li>)
                }
                pages.push(<li className="next" onClick = {this.goNext.bind(this)}  key={last_page + 1}></li>)
            }
            
        }
        return pages;
    }

    goPage(num){
        this.setState({
            currentPage:num
        })
        var url = this.props.CONTENT.last_page_url.match(/(\S*)page=/)[1];
        var head = {head:'Authorization',value:'Bearer '+utils.token};
        AJAX.AJAX(url+'?page='+num,'GET',false,head,this.props.isLogin,this.error);
    }

    goPrev(){
        if(this.state.currentPage==1){
            return;
        }
        var num = this.state.currentPage-1;
        this.goPage(num)
    }
    goNext(){
        if(this.state.currentPage==this.state.pages){
            return;
        }
        var num = this.state.currentPage+1; 
        this.goPage(num)
    }
    goText(e) {
        var target = e.target;
        if(target.value==''){
            return;
        }
        var num = Number(target.value);
        if(num>this.state.pages){
            num = this.state.pages;
        }else if(num<1){
            num = 1;
        }    
        this.goPage(num)
    }
    render() {
        var _this = this;
        var Pages = _this.create.bind(_this)();
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