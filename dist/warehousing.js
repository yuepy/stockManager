webpackJsonp([0],{

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(64);

var _commonLeftMenu = __webpack_require__(66);

var _commonLeftMenu2 = _interopRequireDefault(_commonLeftMenu);

var _commonContent = __webpack_require__(69);

var _commonContent2 = _interopRequireDefault(_commonContent);

var _header = __webpack_require__(68);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(70);

var _footer2 = _interopRequireDefault(_footer);

var _alertBox = __webpack_require__(79);

var _alertBox2 = _interopRequireDefault(_alertBox);

var _AJAX = __webpack_require__(59);

var AJAX = _interopRequireWildcard(_AJAX);

var _utils = __webpack_require__(60);

var utils = _interopRequireWildcard(_utils);

var _entry = __webpack_require__(73);

var _entry2 = _interopRequireDefault(_entry);

var _getDate = __webpack_require__(76);

var DATE = _interopRequireWildcard(_getDate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Warehousing = function (_Component) {
    _inherits(Warehousing, _Component);

    function Warehousing(props) {
        _classCallCheck(this, Warehousing);

        var _this2 = _possibleConstructorReturn(this, (Warehousing.__proto__ || Object.getPrototypeOf(Warehousing)).call(this, props));

        _this2.componentDidMount = function () {
            var _this = _this2;
            _this.getData();
            _this.getSupplier();
        };

        _this2.getData = function () {
            var _this = _this2;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/goods/add/history?date_start=' + DATE.getDate('day', '-') + '&date_end=' + DATE.getDate('day', '-'), 'GET', false, head, _this2.isLogin.bind(_this), _this.error);
        };

        _this2.isLogin = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            _this.setState({
                data: res.data.data,
                allData: res.data
            });
            if (res.msg == '获取成功') {
                _this.setState({
                    supplier: res.data.data
                });
            }
        };

        _this2.showEntry = function () {
            var _this = _this2;
            _this.setState({
                isentry: true
            });
        };

        _this2.selectDelete = function () {
            var _this = _this2;
            _this.setState({
                deleteFlag: !_this.state.deleteFlag
            });
        };

        _this2.onRefFn = function (ref) {
            //接受子组件作用域 并赋值给当前指针的childFn属性;
            var _this = _this2;
            _this.childFn = ref;
        };

        _this2.state = {
            data: '',
            isentry: false,
            allData: '',
            deleteFlag: false,
            searchType: 'commodity',
            alertBox: 'none',
            supplier: ''
        };
        return _this2;
    }

    _createClass(Warehousing, [{
        key: 'error',
        value: function error(res) {
            alert(res.msg);
        }
    }, {
        key: 'isConfirm',
        value: function isConfirm() {
            var _this = this;
            var isStatus = confirm('确认删除?');
            if (isStatus) {
                _this.DELETE();
            }
        }
    }, {
        key: 'DELETE',
        value: function DELETE(e) {
            var deleteStaus = document.querySelector('tbody').querySelectorAll('.delete');
            if (deleteStaus.length < 1) {
                alert('请选择要删除数据');
                return;
            }
            var ids = [];
            for (var i = 0; i < deleteStaus.length; i++) {
                ids.push(deleteStaus[i].id);
            }
            this.childFn.delete(ids);
        }
    }, {
        key: 'searchBtn',
        value: function searchBtn(e) {
            var _this = this;
            var target = e.target;
            var select = target.ownerDocument.querySelector('.searchSelect');
            var id = select.options[select.selectedIndex].getAttribute('id');
            var searchValue = target.ownerDocument.querySelector('.searchValue').value;
            if (searchValue == '') {
                return;
            }
            var url = this.state.allData.path + '?' + id + '=' + searchValue;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(url, 'GET', false, head, this.isLogin, this.error);
        }
    }, {
        key: 'dateChange',
        value: function dateChange(e) {
            var date_start = e.target.ownerDocument.querySelector('.startDate').value;
            var date_end = e.target.ownerDocument.querySelector('.endDate').value;
            var url = this.state.allData.path + '?' + 'date_start=' + date_start + '&date_end=' + date_end;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(url, 'GET', false, head, this.isLogin, this.error);
        }
    }, {
        key: 'clear',
        value: function clear(e) {
            e.target.ownerDocument.querySelector('.searchValue').value = '';
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(this.state.allData.path, 'GET', false, head, this.isLogin, this.error);
        }
    }, {
        key: 'showSupplier',
        value: function showSupplier() {
            var _this = this;
            var show = _this.state.alertBox == 'none' ? 'block' : 'none';
            _this.setState({
                alertBox: show
            });
        }
    }, {
        key: 'searchType',
        value: function searchType(e) {
            //选择工费类型并赋值
            var _this = this;
            var type = e.target.querySelectorAll('option')[e.target.selectedIndex].id;
            _this.setState({
                searchType: type
            });
        }
    }, {
        key: 'getSupplier',
        value: function getSupplier() {
            var _this = this;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/supplier/list', 'GET', false, head, this.isLogin.bind(_this), _this.error);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            return _react2.default.createElement(
                'div',
                { className: 'allStock' },
                _react2.default.createElement(_header2.default, null),
                _react2.default.createElement(_commonLeftMenu2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'rightContent' },
                    _react2.default.createElement(
                        'header',
                        { className: 'rightHeader' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5546\u54C1\u5E93\u5B58\u5165\u5E93'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'dataContent' },
                        _react2.default.createElement(
                            'div',
                            { className: 'optContent' },
                            _react2.default.createElement(
                                'select',
                                { className: 'search', onChange: _this.searchType.bind(_this) },
                                _react2.default.createElement(
                                    'option',
                                    { id: 'commodity' },
                                    '\u5546\u54C1\u67E5\u8BE2'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { id: 'date' },
                                    '\u65E5\u671F\u67E5\u8BE2'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'DateOpt opt', style: { display: _this.state.searchType == 'date' ? 'flex' : 'none' } },
                                _react2.default.createElement('input', { className: 'startDate DateInput', type: 'date' }),
                                '\xA0-\xA0',
                                _react2.default.createElement('input', { className: 'endDate DateInput', type: 'date' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'enterBtn', onClick: _this.dateChange.bind(_this) },
                                    '\u786E\u5B9A'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'searchOpt opt', style: { display: _this.state.searchType == 'commodity' ? 'flex' : 'none' } },
                                _react2.default.createElement(
                                    'select',
                                    { className: 'searchSelect' },
                                    _react2.default.createElement(
                                        'option',
                                        { id: 'goods_name' },
                                        '\u5546\u54C1\u540D\u79F0'
                                    ),
                                    _react2.default.createElement(
                                        'option',
                                        { id: 'goods_number' },
                                        '\u5546\u54C1\u7F16\u53F7'
                                    )
                                ),
                                _react2.default.createElement('input', { className: 'searchValue' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'enterBtn', onClick: _this.searchBtn.bind(_this) },
                                    '\u641C\u7D22'
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'enterBtn clear', onClick: _this.clear.bind(_this) },
                                    '\u91CD\u7F6E'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'optContent twoLine' },
                            _react2.default.createElement(
                                'div',
                                { className: 'enterBtn2', onClick: this.showEntry },
                                '\u5546\u54C1\u5F55\u5165'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'enterBtn2', onClick: _this.showSupplier.bind(_this) },
                                '\u4F9B\u5E94\u5546\u5F55\u5165'
                            ),
                            _this.state.deleteFlag && _react2.default.createElement(
                                'div',
                                { className: 'enterBtn2 isDelete', onClick: _this.isConfirm.bind(_this) },
                                '\u786E\u8BA4\u5220\u9664'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'enterBtn2', onClick: _this.selectDelete.bind(_this) },
                                this.state.deleteFlag ? '取消' : '批量删除'
                            )
                        ),
                        _react2.default.createElement(_alertBox2.default, { Show: _this.state.alertBox, close: _this.showSupplier.bind(_this) }),
                        _react2.default.createElement(_commonContent2.default, {
                            HEAD: [{ title: '日期', name: 'create_time' }, { title: '供应商', name: 'supplier' }, { title: '商品种类', name: 'category' }, { title: '商品名称', name: 'goods_name' }, { title: '商品编号', name: 'goods_number' }, { title: '工费类型', name: 'goods_type' }, { title: '工费', name: 'laborcost' }, { title: '商品重量(件/g)', name: 'weight' }, { title: '总计件数', name: 'num' }, { title: '总计克重(g)', name: 'weight_all' }, { title: '工费总价($)', name: 'price_all' }, { title: '经办人', name: 'operator' }, { title: '操作', name: '删除' }],
                            CONTENT: _this.state.data,
                            deleteFlag: _this.state.deleteFlag,
                            onRefFn: _this.onRefFn,
                            getData: _this.getData,
                            selectDelete: _this.selectDelete,
                            AllData: _this.state.allData,
                            isOutStock: false
                        }),
                        _this.state.isentry && _react2.default.createElement(_entry2.default, {
                            close: function close() {
                                _this.setState({ isentry: false });_this.getData();
                            },
                            isOutStock: false,
                            HEAD: [{ title: '状态', name: '未录入' }, { title: '商品编号', name: 'goods_number' }, { title: '供应商', name: 'supplier' }, { title: '种类', name: 'goods_category' }, { title: '商品名称', name: 'goods_name' }, { title: '工费类型', name: 'goods_type' }, { title: '工费', name: 'goods_laborcost' }, { title: '商品重量(件/g)', name: 'weight' }, { title: '总计件数', name: 'num' }, { title: '总计克重(g)', name: 'weight_all' }, { title: '工费总价($)', name: 'price_all' }, { title: '经办人', name: 'operator' }],
                            supplier: _this.state.supplier
                        }),
                        _react2.default.createElement(_footer2.default, { CONTENT: _this.state.allData, isLogin: this.isLogin })
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return Warehousing;
}(_react.Component);

var _default = Warehousing;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Warehousing, 'Warehousing', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/pages/warehousing/warehousing.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/pages/warehousing/warehousing.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

var AJAX = exports.AJAX = function AJAX(url, method, params, isHead, callback, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            callback(xhr.response);
        } else if (xhr.status >= 400) {
            error(xhr.response);
        }
    };
    xhr.timeout = function () {
        alert('当前请求已超时,是否刷新重试');
    };
    xhr.open(method, url);
    isHead && isHead.length == undefined ? xhr.setRequestHeader(isHead.head, isHead.value) : '';
    if (isHead && isHead.length > 1) {
        for (var i = 0; i < isHead.length; i++) {
            xhr.setRequestHeader(isHead[i].head, isHead[i].value);
        }
    }
    params ? xhr.send(params) : xhr.send();
};
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(AJAX, 'AJAX', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/AJAX.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = __webpack_require__(1).enterModule;

  enterModule && enterModule(module);
})();

var host = exports.host = 'http://106.12.194.98';
var token = exports.token = document.cookie.split('JSESSION=')[1];
var loginIn = exports.loginIn = host + '/api/login'; //登录接口
var repassword = exports.repassword = host + 'api/repassword'; // 修改密码

;

(function () {
  var reactHotLoader = __webpack_require__(1).default;

  var leaveModule = __webpack_require__(1).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(host, 'host', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/utils.js');
  reactHotLoader.register(token, 'token', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/utils.js');
  reactHotLoader.register(loginIn, 'loginIn', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/utils.js');
  reactHotLoader.register(repassword, 'repassword', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/utils.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(61);
            var content = __webpack_require__(67);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(61);
            var content = __webpack_require__(65);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(62);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\np,\nblockquote,\ndl,\ndt,\ndd,\nul,\nol,\nli,\npre,\nform,\nfieldset,\nlegend,\nbutton,\ninput,\ntextarea,\nth,\ntd {\n  margin: 0;\n  padding: 0;\n}\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font: 12px/1.5tahoma, arial, \\5b8b\\4f53;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n}\naddress,\ncite,\ndfn,\nem,\nvar {\n  font-style: normal;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: couriernew, courier, monospace;\n}\nsmall {\n  font-size: 12px;\n}\nul,\nol {\n  list-style: none;\n}\na {\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n}\nsup {\n  vertical-align: text-top;\n}\nsub {\n  vertical-align: text-bottom;\n}\nlegend {\n  color: #000;\n}\nfieldset,\nimg {\n  border: 0;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.allStock {\n  display: flex;\n}\n.rightContent {\n  display: flex;\n  flex-direction: column;\n}\n.rightContent {\n  position: absolute;\n  top: 50px;\n  bottom: 0;\n  left: 200px;\n  right: 0;\n  background: #f0f0f0;\n  display: flex;\n  flex-direction: column;\n}\n.rightContent .rightHeader {\n  width: 100%;\n  height: 60px;\n  background: #FFFFFF;\n  display: flex;\n  align-items: center;\n}\n.rightContent .rightHeader span {\n  display: block;\n  width: 100px;\n  height: 20px;\n  line-height: 20px;\n  border-left: 4px solid #0077fb;\n  margin-left: 15px;\n  padding-left: 5px;\n}\n.rightContent .dataContent {\n  width: 98%;\n  margin: 0 auto;\n  margin-top: 20px;\n  background: #FFFFFF;\n  overflow-y: auto;\n}\n.rightContent .dataContent .optContent {\n  width: 95%;\n  margin: 0 auto;\n  height: 50px;\n  margin-top: 20px;\n  display: flex;\n  align-items: center;\n}\n.rightContent .dataContent .optContent .search {\n  width: 120px;\n  height: 30px;\n  font-size: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  color: #000000;\n  text-indent: 3px;\n  cursor: pointer;\n  outline: none;\n  margin-right: 15px;\n}\n.rightContent .dataContent .optContent .opt {\n  width: 95%;\n  display: flex;\n  align-items: center;\n}\n.rightContent .dataContent .optContent .opt .searchSelect {\n  width: 120px;\n  height: 30px;\n  font-size: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  color: #000000;\n  text-indent: 3px;\n  cursor: pointer;\n  outline: none;\n}\n.rightContent .dataContent .optContent .opt .searchValue {\n  width: 150px;\n  height: 26px;\n  font-size: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  color: #000000;\n  text-indent: 3px;\n  margin-left: 10px;\n  outline: none;\n}\n.rightContent .dataContent .optContent .opt .enterBtn {\n  width: 60px;\n  height: 24px;\n  background: #2B79D9;\n  color: #FFFFFF;\n  border-radius: 3px;\n  text-align: center;\n  line-height: 24px;\n  font-size: 12px;\n  margin-left: 15px;\n  border: 1px #2B79D9 solid;\n  cursor: pointer;\n}\n.rightContent .dataContent .optContent .opt .clear {\n  background: #FEFEFE !important;\n  color: #000000 !important;\n  border: 1px #807575 solid;\n}\n.rightContent .dataContent .optContent .opt .DateInput {\n  width: 120px;\n  height: 25px;\n  font-size: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  color: #000000;\n  text-indent: 3px;\n  outline: none;\n}\n.rightContent .dataContent .optContent .opt .lastBtn {\n  margin-left: auto;\n}\n.rightContent .dataContent .optContent .opt .isDelete {\n  background-color: red!important;\n  border: 1px solid red!important;\n}\n.rightContent .dataContent .twoLine {\n  margin-top: 5px;\n}\n.rightContent .dataContent .twoLine .enterBtn2 {\n  width: 60px;\n  height: 24px;\n  background: #2B79D9;\n  color: #FFFFFF;\n  border-radius: 3px;\n  text-align: center;\n  line-height: 24px;\n  font-size: 12px;\n  margin-right: 15px;\n  border: 1px #2B79D9 solid;\n  cursor: pointer;\n}\n.rightContent .dataContent table {\n  width: 95%;\n  margin: 0 auto;\n  margin-top: 10px;\n  margin-bottom: 50px;\n  font-size: 12px;\n  border-left: 1px solid #e6e6e6;\n  border-top: 1px solid #e6e6e6;\n}\n.rightContent .dataContent table tr th {\n  background: #FAFAFA;\n  border: 1px solid #ececec;\n  height: 40px;\n  line-height: 40px;\n  text-align: left;\n  text-indent: 15px;\n  border-top: none;\n  border-left: none;\n}\n.rightContent .dataContent table tr td {\n  border: 1px solid #e6e6e6;\n  height: 35px;\n  line-height: 35px;\n  text-indent: 15px;\n  border-top: none;\n  border-left: none;\n}\n.rightContent .dataContent table tr .deleteFlag {\n  color: #e4393c;\n}\n.rightContent .dataContent table tr .showInput {\n  display: block;\n}\n.rightContent .dataContent table tr .hideInput {\n  display: none;\n}\n.rightContent .dataContent table .total td {\n  border: 1px solid #e6e6e6;\n  border-top: none;\n  border-left: none;\n  background: #F2F2F2;\n  height: 35px;\n  line-height: 35px;\n  text-indent: 15px;\n}\n.showSupplier .alertBox {\n  position: fixed;\n  width: 500px;\n  height: 300px;\n  background: #FFFFFF;\n  top: 30%;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  z-index: 999999;\n  padding: 5px 10px;\n}\n.showSupplier .alertBox .showContent {\n  width: 100%;\n  height: 200px;\n  border: 1px solid #FeFeFe;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.showSupplier .alertBox .showContent li {\n  list-style: none;\n  width: 100px;\n  height: 30px;\n  background: #F00;\n  padding: 2px;\n  margin-right: 15px;\n  line-height: 30px;\n  text-align: center;\n  border-radius: 3px;\n  font-size: 12px;\n  float: left;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.showSupplier .alertBox .inputContent {\n  display: flex;\n  align-items: center;\n  margin-top: 30px;\n}\n.showSupplier .alertBox .inputContent input {\n  width: 150px;\n  height: 26px;\n  font-size: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 5px;\n  color: #000000;\n  text-indent: 3px;\n  margin-left: 10px;\n  outline: none;\n}\n.showSupplier .alertBox .inputContent .enterBtn {\n  width: 60px;\n  height: 24px;\n  background: #2B79D9;\n  color: #FFFFFF;\n  border-radius: 3px;\n  text-align: center;\n  line-height: 24px;\n  font-size: 12px;\n  margin-left: 15px;\n  border: 1px #2B79D9 solid;\n  cursor: pointer;\n}\n.showSupplier .mask {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100vh;\n  width: 100vw;\n  background: rgba(0, 0, 0, 0.2);\n  z-index: 99990;\n}\n.allStockIndex {\n  width: 100%;\n  text-align: center;\n  font-size: 22px;\n}\n.number #goods_number {\n  width: 60%!important;\n}\n.number button {\n  margin: 0!important;\n  font-size: 12px!important;\n  padding: 2px 4px !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(18);

__webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonLeftMenu = function (_Component) {
    _inherits(CommonLeftMenu, _Component);

    function CommonLeftMenu() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, CommonLeftMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = CommonLeftMenu.__proto__ || Object.getPrototypeOf(CommonLeftMenu)).call.apply(_ref, [this].concat(args))), _this2), _this2.toggleClass = function (e) {
            var _this = _this2;
            if (e.target.nodeName == 'UL' || e.target.nodeName == 'LI' || e.target.parentNode.classList.contains('active')) {
                return;
            }
            _this.addClass(e.target.parentNode.parentNode, 'active');
            e.target.classList.add('active');
        }, _this2.addClass = function (obj, className) {
            if (!obj || !className || obj.children.length < 1) {
                console.error('参数问题!');
                return;
            }
            var lis = obj.querySelectorAll('li');
            for (var i = 0; i < lis.length; i++) {
                if (lis[i].classList.contains(className)) {
                    lis[i].classList.remove(className);
                }
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(CommonLeftMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (document.querySelector('.Allmenu')) {
                var num = location.pathname == '/index' || location.pathname == '/goodsDetail' ? 0 : location.pathname == '/warehousing' ? 1 : location.pathname == '/outStock' ? 2 : location.pathname == '/stockHistory' ? 3 : '';
                if (!document.querySelector('.Allmenu').querySelectorAll('li')[num].classList.contains('active')) document.querySelector('.Allmenu').querySelectorAll('li')[num].classList.add('active');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'commonLeftMenu' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        '\u94F6\u5E97\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Allmenu' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'menu', onClick: this.toggleClass.bind(this) },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/index' },
                                '\u5168\u90E8\u5E93\u5B58'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/warehousing' },
                                '\u5546\u54C1\u5165\u5E93'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/outStock' },
                                '\u5546\u54C1\u51FA\u5E93'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: '/stockHistory' },
                                '\u5546\u54C1\u51FA\u5E93\u8BB0\u5F55'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return CommonLeftMenu;
}(_react.Component);

var _default = CommonLeftMenu;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CommonLeftMenu, 'CommonLeftMenu', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/commonLeftMenu.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/commonLeftMenu.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(62);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".commonLeftMenu {\n  position: absolute;\n  left: 0;\n  top: 50px;\n  bottom: 0;\n  width: 200px;\n  text-align: center;\n  background-color: #323340;\n}\n.commonLeftMenu .title {\n  padding: 20px 0;\n  color: #FFF;\n}\n.commonLeftMenu .Allmenu {\n  position: absolute;\n  top: 60px;\n  bottom: 0;\n  width: 100%;\n  background-color: #323340;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.commonLeftMenu .Allmenu ul {\n  margin-top: 20px;\n}\n.commonLeftMenu .Allmenu ul li {\n  height: 40px;\n  font-size: 18px;\n  line-height: 40px;\n  margin-bottom: 15px;\n  padding: 5px 0;\n}\n.commonLeftMenu .Allmenu ul li a {\n  color: #87888f;\n  text-decoration: none;\n  display: block;\n  width: 100%;\n}\n.commonLeftMenu .active {\n  background-color: #0077fb !important;\n}\n.commonLeftMenu .active a {\n  color: #FFF !important;\n}\n.navHeader {\n  height: 50px;\n  width: 100%;\n  background-color: #0077fb;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n}\n.navHeader .navLeft {\n  margin-left: 30px;\n  color: #FFFFFF;\n}\n.navHeader .navLeft span {\n  display: inline-block;\n}\n.navHeader .navLeft span:first-child {\n  width: 80px;\n  height: 30px;\n  line-height: 27px;\n  font-size: 20px;\n  margin-right: 5px;\n}\n.navHeader .navLeft span:last-child {\n  width: 120px;\n  height: 20px;\n  line-height: 25px;\n  font-size: 14px;\n  margin-left: 5px;\n  padding-left: 5px;\n  border-left: 1px solid #FFFFFF;\n}\n.navHeader .navRight {\n  margin-right: 40px;\n  color: #FFFFFF;\n}\n.navHeader .navRight span {\n  display: inline-block;\n  width: 80px;\n  height: 20px;\n  font-size: 14px;\n}\n.navHeader .navRight i {\n  content: '';\n  width: 0;\n  height: 0;\n  border-style: solid dashed dashed;\n  border-color: #fff transparent transparent;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n  -webkit-transition: all 0.2s;\n  position: absolute;\n  top: 23px;\n  right: 28px;\n  border-width: 6px;\n  border-top-color: rgba(255, 255, 255, 0.7);\n}\n.navHeader .navRight i:hover {\n  margin-top: -9px;\n  border-style: dashed dashed solid;\n  border-color: transparent transparent #fff;\n}\n.navHeader .userMask {\n  position: absolute;\n  right: 22px;\n  top: 40px;\n  width: 80px;\n  height: 30px;\n  background: #FFFFFF;\n  z-index: 999;\n  border: 1px solid #F3F3F3;\n  border-radius: 3px;\n}\n.navHeader .userMask li {\n  list-style: none;\n  text-align: center;\n  line-height: 30px;\n  color: #A6A6A6;\n}\n.navHeader .userMask:after {\n  border: 7px solid transparent;\n  border-bottom-color: #fff;\n  top: -14px;\n  right: 25px;\n  left: auto;\n  position: absolute;\n  content: \"\";\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(18);

__webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var navHeader = function (_Component) {
    _inherits(navHeader, _Component);

    function navHeader(props) {
        _classCallCheck(this, navHeader);

        var _this2 = _possibleConstructorReturn(this, (navHeader.__proto__ || Object.getPrototypeOf(navHeader)).call(this, props));

        _this2.state = {
            userMask: false
        };
        return _this2;
    }

    _createClass(navHeader, [{
        key: 'setCookie',
        value: function setCookie(cname, cvalue, exdays, win) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            win.cookie = cname + "=" + cvalue + "; " + expires;
        }
    }, {
        key: 'showHide',
        value: function showHide() {
            this.setState({
                userMask: !this.state.userMask
            });
        }
    }, {
        key: 'logout',
        value: function logout(e) {
            this.setCookie("JSESSION", "", -1, e.target.ownerDocument);
            window.location.href = '/';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            return _react2.default.createElement(
                'header',
                { className: 'navHeader' },
                _react2.default.createElement(
                    'div',
                    { className: 'navLeft' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6709\u94B1\u91D1\u5E97'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5728\u7EBF\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'navRight' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5E93\u5B58\u7BA1\u7406\u5458'
                    ),
                    _react2.default.createElement('i', { onClick: _this.showHide.bind(_this) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'userMask', style: { display: _this.state.userMask ? 'block' : 'none' } },
                    _react2.default.createElement(
                        'li',
                        { onClick: _this.logout.bind(_this) },
                        '\u767B\u51FA'
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return navHeader;
}(_react.Component);

var _default = navHeader;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(navHeader, 'navHeader', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/header.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/header.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _AJAX = __webpack_require__(59);

var AJAX = _interopRequireWildcard(_AJAX);

var _utils = __webpack_require__(60);

var utils = _interopRequireWildcard(_utils);

var _reactRouterDom = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonContent = function (_Component) {
    _inherits(CommonContent, _Component);

    function CommonContent(props) {
        _classCallCheck(this, CommonContent);

        var _this2 = _possibleConstructorReturn(this, (CommonContent.__proto__ || Object.getPrototypeOf(CommonContent)).call(this, props));

        _this2.refundsClick = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            if (res.msg == '删除成功') {
                _this.props.getData();
                alert('商品已成功退货并恢复库存数量!');
            } else {
                alert(res.msg);
            }
        };

        _this2.delete = function (param) {
            var deleteId = '';
            var _this = _this2;
            if (param instanceof Array) {
                for (var i = 0; i < param.length; i++) {
                    deleteId += i == 0 ? param[i] : ',' + param[i];
                }
            } else {
                deleteId = param;
            }
            var fromData = new FormData();
            fromData.append('ids', deleteId);
            var header = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/goods/store/delete', 'POST', fromData, header, _this.success, _this.error);
        };

        _this2.success = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            if (res.msg == '删除成功') {
                if (_this.props.deleteFlag) {
                    _this.props.selectDelete();
                }
                _this.props.getData();
                alert('数据删除成功!');
            } else {
                alert(res.msg);
            }
        };

        _this2.state = {
            indexFlag: false,
            trID: '',
            total_laborcost: false
        };
        return _this2;
    }

    _createClass(CommonContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            _this.setState({
                deleteFlag: this.props.deleteFlag ? this.props.deleteFlag : false
            });
            if (location.pathname == '/warehousing') {
                _this.props.onRefFn(_this);
            }
            if (location.pathname == '/index') {
                _this.setState({
                    indexFlag: true
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //统计当前页面 工费 合计
            var _this = this;
            debugger;
            if (prevProps != _this.props) {
                _this.total_laborcost();
            }
        }
    }, {
        key: 'deleteClick',
        value: function deleteClick(e) {
            var _this = this;
            var deleteId = event.target.parentNode.id;
            _this.delete(deleteId);
        }
    }, {
        key: 'searchData',
        value: function searchData() {
            var _this = this;
            var tr = event.target.parentNode;
            _this.setState({
                trID: tr.id
            });
            var fromData = new FormData();
            fromData.append('ids', tr.id);
            var header = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/goods/reduce/delete', 'POST', fromData, header, _this.refundsClick, _this.error);
        }
    }, {
        key: 'isConfirm',
        value: function isConfirm(e) {
            var _this = this;
            if (event.target.className != 'deleteFlag') {
                return;
            }
            if (this.props.isOutStock) {
                var isStatus = confirm('是否确认商品已退货?');
                if (isStatus) {
                    _this.searchData();
                }
            } else {
                var isStatus = confirm('确认删除?');
                if (isStatus) {
                    _this.deleteClick();
                }
            }
        }
    }, {
        key: 'error',
        value: function error(res) {
            alert(res.msg);
        }
    }, {
        key: 'checked',
        value: function checked(e) {
            e.target.parentNode.parentNode.classList.add('delete');
        }
    }, {
        key: 'total_laborcost',
        value: function total_laborcost() {
            var _this = this;
            //当前页面 工费 字段合计
            var laborcostTd = document.querySelectorAll('#laborcost');
            if (laborcostTd.length < 1) {
                _this.setState({
                    total_laborcost: true
                });
                return;
            }
            var money = parseFloat(0);
            [].forEach.call(laborcostTd, function (item, index) {
                if (item) {
                    money += parseFloat(item.textContent);
                }
            });
            _this.setState({
                total_laborcost: money.toFixed(2)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;
            return _react2.default.createElement(
                'table',
                { className: 'data' },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            { className: _this.props.deleteFlag ? 'showInput' : 'hideInput' },
                            '\u9009\u62E9'
                        ),
                        _this.props.HEAD.length > 0 && _this.props.HEAD.map(function (item, index) {
                            return _react2.default.createElement(
                                'th',
                                null,
                                item.title
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    _this.props.CONTENT.length > 0 && _this.props.CONTENT.map(function (item, index) {
                        return _react2.default.createElement(
                            'tr',
                            { id: item.id },
                            _react2.default.createElement(
                                'td',
                                { className: _this.props.deleteFlag ? 'showInput' : 'hideInput' },
                                _react2.default.createElement('input', { type: 'checkbox', onChange: _this.checked.bind(_this) })
                            ),
                            _this.props.HEAD.map(function (v, i) {
                                if (v.name == 'create_time') {
                                    var date = new Date(item[v.name] * 1000);
                                    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                                }
                                if (v.title == '商品图片') {
                                    var imgURL = item[v.name] && item[v.name].length > 0 ? item[v.name][0] : false;
                                }
                                return _react2.default.createElement(
                                    'td',
                                    { className: v.title == '操作' ? 'deleteFlag' : '', id: v.name, onClick: _this.isConfirm.bind(_this) },
                                    v.name == 'create_time' ? time : v.title == '操作' && !_this3.props.deleteFlag ? v.name : v.title == '商品图片' ? _react2.default.createElement(
                                        'a',
                                        { target: '_blank', href: imgURL ? imgURL : '' },
                                        imgURL ? item.goods_name + '图片' : '无商品图片'
                                    ) : v.title == '工费类型' ? item[v.name] == '1' ? '件工费' : '克工费' : v.title == '商品种类' && _this.state.indexFlag ? _react2.default.createElement(
                                        _reactRouterDom.Link,
                                        { to: {
                                                pathname: '/goodsDetail',
                                                search: '?' + item[v.name],
                                                state: { fromWechat: true }
                                            } },
                                        item[v.name]
                                    ) : item[v.name]
                                );
                            })
                        );
                    })
                ),
                !_this.state.indexFlag && _react2.default.createElement(
                    'tbody',
                    { className: 'total' },
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement('td', { className: _this.props.deleteFlag ? 'showInput' : 'hideInput' }),
                        _this.props.HEAD.map(function (d, i) {
                            if (i == 0) {
                                var output = '合计：';
                            } else if (d.title == '总计件数') {
                                var output = _this.props.AllData.stat_num_total;
                            } else if (d.title == '工费总价($)') {
                                var output = _this.props.AllData.stat_price_total;
                            } else if (d.title == '总价($)') {
                                var output = _this.props.AllData.stat_price_total;
                            } else if (d.title == '总计克重(g)') {
                                var output = _this.props.AllData.stat_weight_total;
                            } else if (d.title == '工费') {
                                var output = _this.state.total_laborcost;
                            } else {
                                var output = '';
                            }
                            return _react2.default.createElement(
                                'td',
                                null,
                                output
                            );
                        })
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return CommonContent;
}(_react.Component);

var _default = CommonContent;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CommonContent, 'CommonContent', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/commonContent.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/commonContent.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(18);

__webpack_require__(71);

var _AJAX = __webpack_require__(59);

var AJAX = _interopRequireWildcard(_AJAX);

var _utils = __webpack_require__(60);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pageFooter = function (_Component) {
    _inherits(pageFooter, _Component);

    function pageFooter(props) {
        _classCallCheck(this, pageFooter);

        var _this2 = _possibleConstructorReturn(this, (pageFooter.__proto__ || Object.getPrototypeOf(pageFooter)).call(this, props));

        _this2.state = {
            currentPage: _this2.props.CONTENT.current_page,
            groupCount: 5,
            pages: _this2.props.CONTENT.last_page
        };
        return _this2;
    }

    _createClass(pageFooter, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.CONTENT.current_page !== nextProps.CONTENT.current_page || this.props.CONTENT.last_page !== nextProps.CONTENT.last_page) {
                this.setState({
                    currentPage: nextProps.CONTENT.current_page,
                    pages: nextProps.CONTENT.last_page
                });
            }
        }
    }, {
        key: 'create',
        value: function create() {
            var last_page = this.state.pages;
            var currentPage = this.state.currentPage;
            var groupCount = this.state.groupCount;
            var pages = [];
            if (last_page <= this.state.groupCount + 2) {
                pages.push(_react2.default.createElement('li', { className: 'prev', onClick: this.goPrev.bind(this), key: 0 }));
                for (var i = 1; i <= last_page; i++) {
                    pages.push(_react2.default.createElement(
                        'li',
                        { onClick: this.goPage.bind(this, i), className: this.state.currentPage == i ? "active" : "", key: i },
                        i
                    ));
                }
                pages.push(_react2.default.createElement('li', { className: 'next', onClick: this.goNext.bind(this), key: last_page + 1 }));
            } else {
                if (currentPage <= groupCount) {
                    pages.push(_react2.default.createElement('li', { className: 'prev', onClick: this.goPrev.bind(this), key: 0 }));
                    for (var i = 1; i <= groupCount; i++) {
                        pages.push(_react2.default.createElement(
                            'li',
                            { onClick: this.goPage.bind(this, i), className: this.state.currentPage == i ? "active ab" : "", key: i },
                            i
                        ));
                    }
                    if (currentPage == groupCount) {
                        pages.push(_react2.default.createElement(
                            'li',
                            { onClick: this.goPage.bind(this, groupCount + 1), className: this.state.currentPage == groupCount + 1 ? "active" : "", key: groupCount + 1 },
                            groupCount + 1
                        ));
                    }
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: -2 },
                        '\xB7\xB7\xB7'
                    ));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: last_page, onClick: this.goPage.bind(this, last_page) },
                        last_page
                    ));
                    pages.push(_react2.default.createElement('li', { className: 'next', onClick: this.goNext.bind(this), key: last_page + 1 }));
                } else if (currentPage > groupCount && currentPage <= this.state.pages - groupCount) {
                    pages.push(_react2.default.createElement('li', { className: 'prev', onClick: this.goPrev.bind(this), key: 0 }));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: 1, onClick: this.goPage.bind(this, 1) },
                        1
                    ));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: -1 },
                        '\xB7\xB7\xB7'
                    ));
                    for (var i = currentPage - 2; i <= currentPage + 2; i++) {
                        pages.push(_react2.default.createElement(
                            'li',
                            { onClick: this.goPage.bind(this, i), className: this.state.currentPage == i ? "active" : "", key: i },
                            i
                        ));
                    }
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: -2 },
                        '\xB7\xB7\xB7'
                    ));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: last_page, onClick: this.goPage.bind(this, last_page) },
                        last_page
                    ));
                    pages.push(_react2.default.createElement('li', { className: 'next', onClick: this.goNext.bind(this), key: last_page + 1 }));
                } else if (currentPage > this.state.pages - groupCount) {
                    pages.push(_react2.default.createElement('li', { className: 'prev', onClick: this.goPrev.bind(this), key: 0 }));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: 1, onClick: this.goPage.bind(this, 1) },
                        1
                    ));
                    pages.push(_react2.default.createElement(
                        'li',
                        { key: -1 },
                        '\xB7\xB7\xB7'
                    ));
                    if (currentPage == this.state.pages - groupCount + 1) {
                        pages.push(_react2.default.createElement(
                            'li',
                            { onClick: this.goPage.bind(this, this.state.pages - groupCount), key: this.state.pages - groupCount },
                            this.state.pages - groupCount
                        ));
                    }
                    for (var i = this.state.pages - groupCount + 1; i <= this.state.pages; i++) {
                        pages.push(_react2.default.createElement(
                            'li',
                            { onClick: this.goPage.bind(this, i), className: this.state.currentPage == i ? "active" : "", key: i },
                            i
                        ));
                    }
                    pages.push(_react2.default.createElement('li', { className: 'next', onClick: this.goNext.bind(this), key: last_page + 1 }));
                }
            }
            return pages;
        }
    }, {
        key: 'goPage',
        value: function goPage(num) {
            this.setState({
                currentPage: num
            });
            var url = this.props.CONTENT.last_page_url.match(/(\S*)page=/)[1];
            if (url.lastIndexOf('&') !== url.length - 1) {
                url += '?';
            }
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(url + 'page=' + num, 'GET', false, head, this.props.isLogin, this.error);
        }
    }, {
        key: 'goPrev',
        value: function goPrev() {
            if (this.state.currentPage == 1) {
                return;
            }
            var num = this.state.currentPage - 1;
            this.goPage(num);
        }
    }, {
        key: 'goNext',
        value: function goNext() {
            if (this.state.currentPage == this.state.pages) {
                return;
            }
            var num = this.state.currentPage + 1;
            this.goPage(num);
        }
    }, {
        key: 'goText',
        value: function goText(e) {
            var target = e.target;
            if (target.value == '') {
                return;
            }
            var num = Number(target.value);
            if (num > this.state.pages) {
                num = this.state.pages;
            } else if (num < 1) {
                num = 1;
            }
            this.goPage(num);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var Pages = _this.create.bind(_this)();
            return _react2.default.createElement(
                'footer',
                { className: 'pageFooter' },
                _react2.default.createElement(
                    'ul',
                    null,
                    Pages
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5171',
                    _this.props.CONTENT.last_page,
                    '\u9875'
                ),
                '\u7B2C\xA0',
                _react2.default.createElement('input', { onBlur: _this.goText.bind(_this) }),
                '\xA0\u9875'
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return pageFooter;
}(_react.Component);

var _default = pageFooter;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(pageFooter, 'pageFooter', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/footer.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/footer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(61);
            var content = __webpack_require__(72);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(62);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".pageFooter {\n  -moz-user-select: none;\n  -o-user-select: none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 100%;\n  height: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 20px;\n  font-size: 12px;\n  color: #A6A6A6;\n}\n.pageFooter ul li {\n  float: left;\n  width: 25px;\n  height: 25px;\n  border: 2px solid #F3F3F3;\n  border-radius: 5px;\n  font-size: 12px;\n  text-align: center;\n  line-height: 25px;\n  margin-left: 5px;\n  color: #A6A6A6;\n  cursor: pointer;\n}\n.pageFooter ul .active {\n  background: #2A79D8 !important;\n  color: #FFFFFF !important;\n}\n.pageFooter ul .prev {\n  background: url('/dist/images/prev.png') center;\n  background-size: 20px 20px;\n}\n.pageFooter ul .next {\n  background: url('/dist/images/next.png') center;\n  background-size: 20px 20px;\n}\n.pageFooter span {\n  margin-left: 15px;\n  margin-right: 15px;\n}\n.pageFooter input {\n  width: 25px;\n  height: 25px;\n  border: 2px solid #F3F3F3;\n  border-radius: 5px;\n  color: #A6A6A6;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(74);

var _AJAX = __webpack_require__(59);

var AJAX = _interopRequireWildcard(_AJAX);

var _utils = __webpack_require__(60);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_Component) {
    _inherits(Entry, _Component);

    function Entry() {
        _classCallCheck(this, Entry);

        var _this2 = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this));

        _this2.successUpload = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            if (res.msg == '成功') {
                document.querySelector('#goods_images').value = res.data;
                _this.entryChange(document.querySelector('#goods_images'));
            } else {
                document.querySelector('#file_name').textContent = '上传图片';
            }
        };

        _this2.getEntryData = function (res) {
            //获取对应编号库存并填充
            var _this = _this2;
            res = JSON.parse(res);
            var data = res.data.data[0];
            if (!data) {
                return;
            }
            var tr = document.querySelector('.entryContent').querySelector('tbody').querySelectorAll('tr')[_this2.state.trID];
            if (!_this2.props.isOutStock) {
                tr.querySelector('#goods_type').value = data.goods_type;
                tr.querySelector('#goods_type').nextElementSibling.value = data.goods_type;
                if (data.goods_type == '1') {
                    tr.querySelector('#weight').value = data.weight;
                }
                tr.querySelector('#goods_category').value = data.category;
                tr.querySelector('#goods_name').value = data.goods_name;
                tr.querySelector('#goods_laborcost').value = data.laborcost;
                tr.querySelector('#supplier').value = data.supplier;
            } else {
                tr.querySelector('#num').placeholder = data.num;
                tr.querySelector('#goods_type').value = data.goods_type;
                tr.querySelector('#goods_type').nextElementSibling.value = data.goods_type;
                if (data.goods_type == '1') {
                    tr.querySelector('#weight').value = data.weight;
                }
                tr.querySelector('#weight_all').placeholder = data.weight_all;
                tr.querySelector('#goods_laborcost').placeholder = data.laborcost;
            }
            _this.selectType(tr.querySelector('#goods_type'));
        };

        _this2.state = {
            currentDate: '',
            rownum: '',
            trID: ''
        };
        return _this2;
    }

    _createClass(Entry, [{
        key: 'save',
        value: function save(elem) {
            //保存提交数据
            var _this = this;
            var tr = elem.parentNode;
            var fromData = new FormData();
            if (!_this.props.isOutStock) {
                fromData.append('supplier', tr.querySelector('#supplier').value);
                fromData.append('goods_category', tr.querySelector('#goods_category').value);
                fromData.append('goods_name', tr.querySelector('#goods_name').value);
                fromData.append('goods_number', tr.querySelector('#goods_number').value);
                fromData.append('price', '00');
                fromData.append('goods_type', tr.querySelector('#goods_type').value);
                fromData.append('goods_laborcost', tr.querySelector('#goods_laborcost').value);
                fromData.append('weight', tr.querySelector('#weight').value);
                fromData.append('num', tr.querySelector('#num').value);
                fromData.append('weight_all', tr.querySelector('#weight_all').value);
                fromData.append('price_all', tr.querySelector('#price_all').value);
                fromData.append('operator', tr.querySelector('#operator').value);
                //var params = 'supplier='+supplier+'&goods_name='+goods_name+'&goods_number='+goods_number+'&price='+price+'&weight='+weight+'&num='+num+'&weight_all='+weight_all+'&price_all='+price_all;
                var header = { head: 'Authorization', value: 'Bearer ' + utils.token };
                AJAX.AJAX('http://106.12.194.98/api/goods/add', 'POST', fromData, header, this.success, this.error);
                return;
            }
            if (_this.props.isOutStock) {
                fromData.append('customer', tr.querySelector('#customer').value);
                fromData.append('goods_number', tr.querySelector('#goods_number').value);
                fromData.append('current_price', '0.0000001');
                fromData.append('num', tr.querySelector('#num').value);
                fromData.append('price_all', tr.querySelector('#price_all').value);
                fromData.append('operator', tr.querySelector('#operator').value);
                fromData.append('goods_type', tr.querySelector('#goods_type').value);
                fromData.append('weight', tr.querySelector('#weight').value);
                //fromData.append('category' , tr.querySelector('#category').value);
                fromData.append('goods_laborcost', tr.querySelector('#goods_laborcost').value);
                fromData.append('weight_all', tr.querySelector('#weight_all').value);
                //fromData.append('goods_images' , tr.querySelector('#goods_images').value);
                //var params = 'customer='+customer+'&num='+num+'&goods_number='+goods_number+'&current_price='+current_price+'&price_all='+price_all+'&operator='+operator+'&goods_images='+goods_images;
                var header = { head: 'Authorization', value: 'Bearer ' + utils.token };
                AJAX.AJAX('http://106.12.194.98/api/goods/reduce', 'POST', fromData, header, this.success, this.error);
            }
        }
    }, {
        key: 'success',
        value: function success(res) {
            //保存成功
            var _this = this;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            if (res.msg == '入库成功') {
                var elem = document.querySelector('.save');
                var tds = elem.querySelectorAll('td');
                [].forEach.call(tds, function (item, index) {
                    if (item) {
                        if (index == 0) {
                            item.textContent = '已录入';
                            item.style.backgroundColor = '#005ae0';
                            item.style.color = '#fff';
                            item.parentNode.classList.remove('save');
                            item.parentNode.classList.add('fixed');
                        } else {
                            item.querySelector('input').disabled = true;
                        }
                    }
                });
                return;
            }
            if (res.msg == '出库成功') {
                var elem = document.querySelector('.save');
                var tds = elem.querySelectorAll('td');
                [].forEach.call(tds, function (item, index) {
                    if (item) {
                        if (index == 0) {
                            item.textContent = '已录入';
                            item.style.backgroundColor = '#005ae0';
                            item.style.color = '#fff';
                            item.parentNode.classList.remove('save');
                            item.parentNode.classList.add('fixed');
                        } else {
                            item.querySelector('input').disabled = true;
                        }
                    }
                });
                return;
            }
            if (res.msg.indexOf('成功') == -1) {
                if (res.msg.indexOf('查询不到') != -1) {
                    alert('第' + document.querySelector('.save').rowIndex + '条数据 [ 商品编号 ]' + res.msg);
                    return;
                }
                alert('第' + document.querySelector('.save').rowIndex + '条数据' + res.msg);
            }
        }
    }, {
        key: 'error',
        value: function error(res) {
            alert(res.msg);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            //页面初始化需要渲染的数据
            var _this = this;
            _this.getCurrentDate();
            if (document && document.querySelectorAll('.disabled')) {
                var elem = document.querySelectorAll('.disabled');
                for (var i = 0; i < elem.length; i++) {
                    elem[i].disabled = true;
                }
            }
        }
    }, {
        key: 'getCurrentDate',
        value: function getCurrentDate() {
            //获取当前时间
            var _this = this;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            _this.setState({
                currentDate: year + '-' + month + '-' + day
            });
            return year + '-' + month + '-' + day;
        }
    }, {
        key: 'entryChange',
        value: function entryChange(e) {
            //表格录入数据逻辑
            var _this = this;
            if (e.target == undefined) {
                e.target = e;
            }
            if (e.target.nodeName != 'INPUT' || e.target.className == 'upload_file') {
                return;
            }
            _this.setState({
                rownum: e.target.parentNode.parentNode.rowIndex
            });
            _this.isShowSave(e.target); // 判断当前数据是否填满 满足提交条件
            switch (e.target.id) {
                case 'price':
                    _this.autoMerge(e.target, 'price');break;
                case 'weight':
                    _this.autoMerge(e.target, 'weight');break;
                case 'weight_all':
                    _this.autoMerge(e.target, 'weight_all');break;
                case 'num':
                    _this.autoMerge(e.target, 'num');break;
                case 'goods_laborcost':
                    _this.autoMerge(e.target, 'goods_laborcost');break;
                case 'current_price':
                    _this.autoMerge(e.target, 'price');break;
            }
        }
    }, {
        key: 'autoMerge',
        value: function autoMerge(elem, name) {
            //自动计算表格结果
            if (!elem || !name) {
                return;
            }
            var _this = this;
            var tr = elem.parentNode.parentNode;
            var goods_laborcost = window.isNaN(parseFloat(tr.querySelector('#goods_laborcost').value)) ? '' : parseFloat(tr.querySelector('#goods_laborcost').value);
            var num = window.isNaN(parseFloat(tr.querySelector('#num').value)) ? '' : parseFloat(tr.querySelector('#num').value);
            var weight = window.isNaN(parseFloat(tr.querySelector('#weight').value)) ? '' : parseFloat(tr.querySelector('#weight').value);
            var weight_all = window.isNaN(parseFloat(tr.querySelector('#weight_all').value)) ? '' : parseFloat(tr.querySelector('#weight_all').value);
            var price = !tr.querySelector('#price') ? 0 : !this.props.isOutStock ? parseFloat(tr.querySelector('#price').value) : !tr.querySelector('#current_price') ? 0 : parseFloat(tr.querySelector('#current_price').value);
            price = window.isNaN(price) ? '' : price;
            var price_all = window.isNaN(parseFloat(tr.querySelector('#price_all').value)) ? '' : parseFloat(tr.querySelector('#price_all').value);
            if (tr.querySelector('#goods_type').value == '1') {
                if (name == 'price') {
                    if (price == '') {
                        tr.querySelector('#price_all').value = '';
                        return;
                    }
                    if (num == '' || goods_laborcost == '') {
                        return;
                    }
                    tr.querySelector('#price_all').value = (weight_all * price + num * goods_laborcost).toFixed(2);
                    _this.isShowSave(tr.querySelector('#price_all'));
                }
                if (name == 'num' || name == 'weight') {
                    if (num == '' || weight == '') {
                        tr.querySelector('#weight_all').value = '';
                        tr.querySelector('#price_all').value = '';
                        return;
                    }
                    var total = weight * num;
                    tr.querySelector('#weight_all').value = total;
                    _this.isShowSave(tr.querySelector('#weight_all'));
                    if (price === '' || goods_laborcost == '') {
                        return;
                    }
                    tr.querySelector('#price_all').value = (price * total + num * goods_laborcost).toFixed(2);
                    _this.isShowSave(tr.querySelector('#price_all'));
                }
                if (name == 'goods_laborcost') {
                    // 工费 * 数量 + (数量 * 商品重量 = 总克重) * 单价 = 总价
                    if (goods_laborcost == '' || weight_all == '') {
                        tr.querySelector('#price_all').value = '';
                        return;
                    }
                    tr.querySelector('#price_all').value = (goods_laborcost * num + num * weight * price).toFixed(2);
                    _this.isShowSave(tr.querySelector('#price_all'));
                }
            }
            if (tr.querySelector('#goods_type').value == '2') {
                if (name == 'price' || name == 'weight_all' || name == 'goods_laborcost') {
                    if (price === '' || weight_all == '' || goods_laborcost == '') {
                        tr.querySelector('#price_all').value = '';
                        return;
                    }
                    tr.querySelector('#price_all').value = (price * weight_all + weight_all * goods_laborcost).toFixed(2);
                    _this.isShowSave(tr.querySelector('#price_all'));
                }
            }
        }
    }, {
        key: 'isShowSave',
        value: function isShowSave(elem) {
            //效验当前行时候满足提交条件
            var _this = this;
            var tr = elem.parentNode.parentNode;
            var tds = tr.querySelectorAll('td');
            if (tr.classList.contains('save')) {
                return;
            }
            var isDone = false;
            var type = tr.querySelector('#goods_type').value;
            for (var i = 1; i < tds.length; i++) {
                if (tds[i].querySelector('input').value == '' && tds[i].querySelector('input').id != 'goods_images' && tds[i].querySelector('input').className != 'upload_file') {
                    if (tds[i].querySelector('input').value == '' && tds[i].querySelector('input').id == 'weight' && type == '2') {
                        isDone = true;
                        continue;
                    }
                    isDone = false;
                    tds[0].style.backgroundColor = '#fff';
                    return;
                } else {
                    isDone = true;
                }
            }
            if (isDone) {
                tds[0].parentNode.classList.add('save');
                setTimeout(function () {
                    // if(document.querySelector('.save')&& document.querySelector('.save').querySelector('#goods_images')&&document.querySelector('.save').querySelector('#goods_images').value == ''){
                    //     var isImages = confirm('第'+document.querySelector('.save').rowIndex+'数据未上传商品图片,是否继续提交');
                    //     if(!isImages){
                    //         return;
                    //     }
                    // }
                    if (_this.state.rownum == document.querySelector('.save').rowIndex) {
                        var timer1 = setTimeout(function () {
                            _this.save(tds[0]);
                        }, 1000);
                    } else {
                        _this.save(tds[0]);
                    }
                }, 3000);
            }
        }
    }, {
        key: 'uploadClick',
        value: function uploadClick(e) {
            //代理触发上传图片input
            e.target.parentNode.querySelector('.upload_file').click();
        }
    }, {
        key: 'upload',
        value: function upload(e) {
            //图片上传 . 
            var _this = this;
            var fromData = new FormData();
            fromData.append('image', e.target.files[0]);
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            document.querySelector('#file_name').textContent = e.target.files[0].name;
            AJAX.AJAX('http://106.12.194.98/api/upload/image', "POST", fromData, head, this.successUpload, this.errorUpload);
        }
    }, {
        key: 'errorUpload',
        value: function errorUpload() {
            alert('上传失败!');
        }
    }, {
        key: 'selectType',
        value: function selectType(dom) {
            //选择商品工费类型
            var _this = this;
            var dataDom = '';
            if (dom.target) {
                event.target.parentNode.querySelector('input').value = event.target.value;
                var tr = event.target.parentNode.parentNode;
                dataDom = event.target;
            } else {
                dataDom = dom;
                var tr = dom.parentNode.parentNode;
            }
            if (dataDom.value == '1') {
                tr.querySelector('#weight').disabled = false;
                tr.querySelector('#weight_all').disabled = true;
                if (tr.querySelector('#weight').classList.contains('disabled')) {
                    tr.querySelector('#weight').classList.remove('disabled');
                    tr.querySelector('#weight_all').classList.add('disabled');
                } else {
                    tr.querySelector('#weight_all').classList.add('disabled');
                }
            } else {
                tr.querySelector('#weight').value = '';
                tr.querySelector('#weight').disabled = true;
                tr.querySelector('#weight_all').disabled = false;
                if (tr.querySelector('#weight_all').classList.contains('disabled')) {
                    tr.querySelector('#weight_all').classList.remove('disabled');
                    tr.querySelector('#weight').classList.add('disabled');
                } else {
                    tr.querySelector('#weight').classList.add('disabled');
                }
            }
            _this.isShowSave(dataDom.parentNode.querySelector('input'));
        }
    }, {
        key: 'entryBlur',
        value: function entryBlur(e) {
            //输入商品编号带出数据
            var _this = this;
            if (e.target.id != 'goods_number' || e.target.value.replace(/\s/, '') == '') {
                return;
            }
            var tr = event.target.parentNode.parentNode;
            var goods_number = tr.querySelector('#goods_number').value;
            _this.setState({
                trID: parseInt(tr.dataset.index) - 1
            });
            var header = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/goods/all?goods_number=' + goods_number, 'GET', false, header, _this.getEntryData, _this.error);
        }
    }, {
        key: 'selectSupplier',
        value: function selectSupplier(e) {
            //选择供应商
            e.target.parentNode.querySelector('input').value = e.target.value;
        }
    }, {
        key: 'getSupplier',
        value: function getSupplier(name) {
            //渲染全部供应商
            var _this = this;
            return _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'text', style: { display: 'none' }, id: name, name: name }),
                _react2.default.createElement(
                    'select',
                    { onChange: _this.selectSupplier.bind(_this) },
                    _this.props && _this.props.supplier.map(function (item, index) {
                        return _react2.default.createElement(
                            'option',
                            { value: item.nam },
                            item.name
                        );
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // 表示第一次渲染多少行空表格 (待录入数据)
            return _react2.default.createElement(
                'div',
                { className: 'entryContent' },
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    _react2.default.createElement('div', { className: 'close', onClick: this.props.close }),
                    _react2.default.createElement(
                        'div',
                        { className: 'pageTitle' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            _this.props.isOutStock ? '商品库存 - 出库录入界面' : '商品库存 - 入库录入界面'
                        )
                    ),
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _this.props.HEAD.length > 0 && _this.props.HEAD.map(function (item, index) {
                                    return _react2.default.createElement(
                                        'th',
                                        null,
                                        item.title
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            arr.map(function (k, i) {
                                return _react2.default.createElement(
                                    'tr',
                                    { 'data-index': k, onChange: _this.entryChange.bind(_this), onBlur: _this.entryBlur.bind(_this) },
                                    _this.props.HEAD.length > 0 && _this.props.HEAD.map(function (item, index) {
                                        return item.title == '状态' ? _react2.default.createElement(
                                            'td',
                                            { style: { width: '60px', textAlign: 'centent' }, id: item.name },
                                            item.name
                                        ) : item.title == '日期' ? _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('input', { type: 'date', name: item.name, defaultValue: _this.state && _this.state.currentDate, id: item.name })
                                        ) : item.title == '总计克重(g)' || item.title == '合计价钱($)' || item.title == '工费总价($)' || item.title == '合计克重(g)' ? _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('input', { type: 'text', name: item.name, id: item.name, className: 'disabled' })
                                        ) : item.title == '商品图片' ? _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('input', { type: 'file', onChange: _this.upload.bind(_this), style: { display: "none" }, className: 'upload_file' }),
                                            _react2.default.createElement('input', { type: 'text', name: item.name, id: item.name, style: { display: "none" } }),
                                            _react2.default.createElement(
                                                'span',
                                                { onClick: _this.uploadClick.bind(_this), id: 'file_name' },
                                                '\u4E0A\u4F20\u56FE\u7247'
                                            )
                                        ) : item.title == '工费类型' ? _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('input', { type: 'text', style: { display: 'none' }, id: item.name, name: item.name, defaultValue: '1' }),
                                            _react2.default.createElement(
                                                'select',
                                                { onChange: _this.selectType.bind(_this) },
                                                _react2.default.createElement(
                                                    'option',
                                                    { value: '1' },
                                                    '\u4EF6'
                                                ),
                                                _react2.default.createElement(
                                                    'option',
                                                    { value: '2' },
                                                    '\u514B'
                                                )
                                            )
                                        ) : item.title == '供应商' ? _this.getSupplier(item.name) : item.title == '商品编号' && !_this.props.isOutStock ? _react2.default.createElement(
                                            'td',
                                            { className: 'number' },
                                            _react2.default.createElement('input', { type: 'text', name: item.name, id: item.name }),
                                            _react2.default.createElement(
                                                'button',
                                                null,
                                                '\u751F\u6210'
                                            )
                                        ) : _react2.default.createElement(
                                            'td',
                                            null,
                                            _react2.default.createElement('input', { type: 'text', name: item.name, id: item.name })
                                        );
                                    })
                                );
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return Entry;
}(_react.Component);

var _default = Entry;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Entry, 'Entry', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/entry.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/entry.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(61);
            var content = __webpack_require__(75);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(62);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".entryContent {\n  position: fixed;\n  top: 10%;\n  background-color: rgba(0, 0, 0, 0.7);\n  padding: 20px;\n  width: 83%;\n  height: 83%;\n}\n.entryContent .content {\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n}\n.entryContent .pageTitle {\n  text-align: center;\n  padding: 20px;\n  font-size: 18px;\n  color: #005ae0;\n}\n.entryContent .close {\n  background: url('/dist/images/close.png') no-repeat center center;\n  width: 25px;\n  height: 25px;\n  color: #e4393c;\n  padding: 8px;\n  padding-left: 2px;\n  text-align: center;\n  padding: 2px;\n  line-height: 20px;\n  position: fixed;\n  right: 35px;\n  background-size: 120%;\n}\n.entryContent input {\n  width: 90%;\n  border: none;\n  height: 25px;\n  font-size: 14px;\n  padding: 0px 4px;\n}\n.entryContent span {\n  width: 100px;\n  overflow: hidden;\n  display: block;\n  border: 1px solid #eee;\n  border-radius: 4px;\n  background-color: #eee;\n}\n.entryContent td {\n  font-size: 14px;\n  height: 30px!important;\n  line-height: initial!important;\n  text-indent: initial!important;\n  text-align: center;\n  height: 60px;\n}\n.entryContent th {\n  text-align: center;\n  font-size: 14px;\n  text-align: center!important;\n  text-indent: initial!important;\n  white-space: nowrap;\n}\n.entryContent .footer_bth {\n  text-align: center;\n}\n.entryContent .disabled {\n  background-color: #eee;\n  border: 1.2px solid #aaa !important;\n}\n.entryContent .disabled input {\n  background-color: #eee;\n}\n.entryContent button {\n  margin: 5px 10px;\n  background-color: #005ae0;\n  color: #fff;\n  border: none;\n  padding: 5px 20px;\n  border-radius: 5px;\n  font-size: 14px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

var getDate = exports.getDate = function getDate(type, str) {
    //获取当前日期  type为获取 月 或者 天;  str 为 日期间隔符 - 或 /
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (type == 'month') {
        return year + str + month;
    }
    if (type == 'day') {
        return year + str + month + str + day;
    }
};
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(getDate, 'getDate', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/getDate.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _AJAX = __webpack_require__(59);

var AJAX = _interopRequireWildcard(_AJAX);

var _utils = __webpack_require__(60);

var utils = _interopRequireWildcard(_utils);

var _reactRouterDom = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(1).enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonContent = function (_Component) {
    _inherits(CommonContent, _Component);

    function CommonContent() {
        _classCallCheck(this, CommonContent);

        var _this2 = _possibleConstructorReturn(this, (CommonContent.__proto__ || Object.getPrototypeOf(CommonContent)).call(this));

        _this2.componentDidMount = function () {
            var _this = _this2;
            _this.getData();
        };

        _this2.getData = function () {
            var _this = _this2;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX('http://106.12.194.98/api/supplier/list', 'GET', false, head, _this2.isLogin.bind(_this), _this.error);
        };

        _this2.isLogin = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            _this.setState({
                data: res.data.data
            });
        };

        _this2.ischangeLogin = function (res) {
            var _this = _this2;
            res = JSON.parse(res);
            if (res.msg == '身份失效') {
                window.location.href = '/';
            }
            _this.getData();
        };

        _this2.state = {
            data: ''
        };
        return _this2;
    }

    _createClass(CommonContent, [{
        key: 'save',
        value: function save(e) {
            debugger;
            var _this = this;
            var value = e.target.ownerDocument.querySelector('#supplierValue').value;
            e.target.ownerDocument.querySelector('#supplierValue').value = '';
            var url = 'http://106.12.194.98/api/supplier/add?name=' + value;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(url, 'POST', false, head, _this.ischangeLogin.bind(_this), _this.error);
        }
    }, {
        key: 'isConfirm',
        value: function isConfirm(e) {
            var _this = this;
            var value = e.target.textContent;
            var id = e.target.id;
            var isStatus = confirm('确认删除：' + value + '?');
            if (isStatus) {
                _this.delete(value, id);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(val, id) {
            debugger;
            var _this = this;
            var url = 'http://106.12.194.98/api/supplier/delete?name=' + val + '&ids=' + id;
            var head = { head: 'Authorization', value: 'Bearer ' + utils.token };
            AJAX.AJAX(url, 'POST', false, head, _this.ischangeLogin.bind(_this), _this.error);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            return _react2.default.createElement(
                'div',
                { className: 'showSupplier', style: { display: _this.props.Show } },
                _react2.default.createElement('div', { className: 'mask' }),
                _react2.default.createElement(
                    'div',
                    { className: 'alertBox' },
                    _react2.default.createElement(
                        'div',
                        { className: 'showContent' },
                        _this.state.data !== '' && _this.state.data.data !== '' && _this.state.data.map(function (d, i) {
                            return _react2.default.createElement(
                                'li',
                                { title: d.name, onClick: _this.isConfirm.bind(_this), id: d.id },
                                d.name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'inputContent' },
                        _react2.default.createElement('input', { id: 'supplierValue' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'enterBtn', onClick: _this.save.bind(_this) },
                            '\u63D0\u4EA4'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'enterBtn', onClick: _this.props.close.bind(_this) },
                            '\u5173\u95ED'
                        )
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return CommonContent;
}(_react.Component);

var _default = CommonContent;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(1).default;

    var leaveModule = __webpack_require__(1).leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CommonContent, 'CommonContent', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/alertBox.js');
    reactHotLoader.register(_default, 'default', '/Users/yuhao/Documents/\u5E93\u5B58\u7BA1\u7406\u7CFB\u7EDF/code/react-code/src/component/alertBox.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ })

});