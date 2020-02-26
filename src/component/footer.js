import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'pageStyle/common/footer.less';
export default class pageFooter extends Component {
    render() {
        return (
            <footer className="pageFooter">
                <ul>
                    <li>＜</li>
                    <li className="active">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>...</li>
                    <li>20</li>
                    <li>＞</li>
                </ul>
                <span>共20页</span>
                第&nbsp;<input />&nbsp;页 
            </footer>
        )
    }
}