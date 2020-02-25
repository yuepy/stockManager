import React, {Component} from 'react';
import CommonLeftMenu from 'component/commonLeftMenu.js';
import * as AJAX from 'component/AJAX.js'
import * as utils from 'component/utils.js'
export default class Warehousing extends Component {
    render(){
        return(
            <div className='allStock'>
                <CommonLeftMenu />
                <div className='rightContent'>商品出库记录</div>
            </div>
        )
    }
}