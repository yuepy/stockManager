import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'pageStyle/common/commonLeftMenu.less';
export default class CommonLeftMenu extends Component {
    render() {
        return (
            <div className='commonLeftMenu'>
                <div className='title'>
                    <h3>银店库存管理系统</h3>
                </div>
                <div className='Allmenu'>
                    <ul className='menu'>
                        <li><Link to='/index'>全部库存</Link></li>
                        <li className="active"><Link to='/warehousing'>商品入库</Link></li>
                        <li><Link to='/outStock'>商品出库</Link></li>
                        <li><Link to='/stockHistory'>商品出库记录</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}