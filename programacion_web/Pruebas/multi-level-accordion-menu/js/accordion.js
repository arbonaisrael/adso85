/*!
  * Accordion Menu Plugin v1.0
  * Copyright (c) 2020 Iven Wong
  * Released under the MIT license
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
        typeof define === 'function' && define.amd ? define(['jquery'], factory) :
            (global = global || self, global.Accordion = factory(global.jQuery))
})(this, function ($) {
    "use strict";

    //#region 辅助方法

    /**
     * 对象合并
     * @param {object} target -目标对象,其他对象的成员属性将被附加到该对象上,合并后返回该对象
     * @param {object} source -提供属性合并的供体对象
     * @param {boolean} override -如果和合并对象有相同属性,选择是否覆盖,默认true覆盖
     * @returns {object} 合并后对象
     */
    function extend(target, source, override) {
        override = typeof override === "undefined" ? true : toBool(override);
        for (var key in source) {
            if (target.hasOwnProperty(key) && !override) continue;
            target[key] = source[key];
        }
        return target;
    }

    /**
     * 转换为布尔值
     * 对于0、-0、null、undefined、NaN、false、""、”false“字符串(不区分大小写)都转为false处理
     * @param {object} value -要转换的目标
     * @returns {boolean} 返回布尔值
     */
    function toBool(value) {
        return (typeof value === "string" && value.toLowerCase() === "false") ? false : Boolean(value);
    }

    /**
     * 解析一个字符串，并返回一个浮点数
     * @param {string} num
     * @returns {number}
     */
    function parseNum(num) {
        var n = parseFloat(num);
        return isNaN(n) ? 0 : n;
    }

    /**
     * 转为对象
     * @param {string|object} target -转换目标
     * @param {object} defaultVal -默认返回
     * @returns {object||null} -返回对象
     */
    function parseObj(target, defaultVal) {
        if (target && typeof target === 'object') {
            return target
        }
        else if (target && typeof target === 'string') {
            try {
                return JSON.parse(target);
            } catch (e) {
                console.error(e.message)
            }
        } else {
            return defaultVal || null;
        }
    }

    /**
     * 复制json对象
     * @param {object} obj -元对象
     * @returns {object} 返回复制后的对象
     */
    function copyObj(obj) {
        return JSON.parse(JSON.stringify(typeof obj==='undefined'?null:obj));
    }

    /**
     * 创建XMLHttpRequest对象
     * @returns {XMLHttpRequest|null}
     */
    function createRequest() {
        if (window.XMLHttpRequest) {
            //DOM 2浏览器
            return new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            // IE浏览器
            var versions = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var i = 0; i < versions.length; i++) {
                try {
                    return new ActiveXObject(versions[i]);
                } catch (e) {
                    //console.error("Your browser does not support "+versions[i]);
                }
            }
        }
        return null;
    }

    /**
     * 获取梯度渐变颜色组
     * @param {string} sColor -开始渐变色(HEX十六进制颜色码)
     * @param {string} eColor -结束渐变色(HEX十六进制颜色码)
     * @param {number} step -开始至结束颜色过渡段数
     * @returns {Array}
     */
    function gradientColors(sColor, eColor, step) {
        var startRGB = getRgbColor(sColor);//转换为rgb数组模式
        var startR = startRGB[0];
        var startG = startRGB[1];
        var startB = startRGB[2];
        var endRGB = getRgbColor(eColor);
        var endR = endRGB[0];
        var endG = endRGB[1];
        var endB = endRGB[2];
        var sR = (endR - startR) / step;//总差值
        var sG = (endG - startG) / step;
        var sB = (endB - startB) / step;
        var colorArr = [];
        for (var i = 0; i < step; i++) {
            //计算每一步的hex值
            var hex = getHexColor('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
            colorArr.push(hex);
        }
        return colorArr;

        /**
         * 将hex表示方式颜色转换为rgb表示方式颜色(这里返回rgb数组模式)
         * @param {string} color -HEX十六进制颜色码
         * @returns {array}
         */
        function getRgbColor(color) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var color = color.toLowerCase();
            if (color && reg.test(color)) {
                if (color.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }
                    color = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                return sColorChange;
            } else {
                return color;
            }
        }

        /**
         * 将rgb表示方式转换为hex表示方式
         * @param {string} rgb -rgb颜色
         * @returns {string}
         */
        function getHexColor(rgb) {
            var _this = rgb;
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            if (/^(rgb|RGB)/.test(_this)) {
                var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
                var strHex = "#";
                for (var i = 0; i < aColor.length; i++) {
                    var hex = Number(aColor[i]).toString(16);
                    hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
                    if (hex === "0") {
                        hex += hex;
                    }
                    strHex += hex;
                }
                if (strHex.length !== 7) {
                    strHex = _this;
                }
                return strHex;
            } else if (reg.test(_this)) {
                var aNum = _this.replace(/#/, "").split("");
                if (aNum.length === 6) {
                    return _this;
                } else if (aNum.length === 3) {
                    var numHex = "#";
                    for (var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            } else {
                return _this;
            }
        }
    }

    /**********数组排序************/
    /**
     * 对树状对象数组进行排序
     * @param {array} treeData -树状对象数组
     * @param {string} childrenField -子节点数组名称
     * @param {string} sortField -排序字段名称
     * @param {string} sortMode -排序方式asc/desc,默认asc
     * @returns {array} 返回排序后数组，改变原素组
     */
    function sortTreeArr(treeData, childrenField, sortField, sortMode) {
        sortMode = sortMode || 'asc';
        if (!sortField) return treeData;
        var n = 1;
        if (sortMode && sortMode.toLowerCase() == "desc") n = -1;
        for (var i = 0; i < treeData.length; i++) {
            if (treeData[i][childrenField])
                sortTreeArr(treeData[i][childrenField], childrenField, sortField, sortMode)
        }
        sortArr(treeData, sortMode, sortField);
        return treeData;
    }

    /**
     * 数组排序
     * @param {array} arr 目标数组
     * @param {string} sortMode 排序方式,asc升序,desc降序
     * @param {string} sortField 排序字段，没有则为空
     * @returns {array} 返回排序后数组，改变原素组
     */
    function sortArr(arr, sortMode, sortField) {
        sortField = sortField || '';
        var n = 1;
        if (sortMode && sortMode.toLowerCase() == "desc") n = -1;
        arr.sort(function (a, b) {
            var a1, b1;
            a1 = sortField ? a[sortField] : a;
            b1 = sortField ? b[sortField] : b;
            if (a1 > b1) {
                return 1 * n;
            }
            else if (a1 < b1) {
                return -1 * n;
            } else {
                return 0 * n;
            }
        });
        return arr;
    }

    //#endregion

    //#region HTMLElement节点元素

    /**
     * 向指定元素添加绑定事件句柄
     * @param {object} ele -要绑定事件的dom对象目标
     * @param {string} event -要指定的事件名称。注意:不要使用"on"前缀
     * @param {function} fn -指定要事件触发时执行的函数。注意:若fn为匿名函数则无法通过removeEventListener方法移除该事件
     * @param {boolean} useCapture -布尔值，指定事件是否在捕获或冒泡阶段执行;true-事件句柄在捕获阶段执行,false(默认)-事件句柄在冒泡阶段执行
     */
    function addEvent(ele, event, fn, useCapture) {
        //useCapture undefined即默认false
        useCapture = toBool(useCapture);
        ele.addEventListener ? ele.addEventListener(event, fn, useCapture) : (ele.attachEvent ? ele.attachEvent("on" + event, fn, useCapture) : ele["on" + event] = fn);
    }

    /**
     * 移除指定元素绑定的事件句柄(必须addEventListener方法添加的事件句柄)
     * @param {object} ele -要绑定事件的dom对象目标
     * @param {string} event -要移除的事件名称。注意:不要使用"on"前缀
     * @param {function} fn -指定要移除的函数。注意:若addEventListener使用的fn为匿名函数则无法通过removeEventListener方法移除该事件
     * @param {boolean} useCapture -布尔值，指定移除事件句柄的阶段;true-在捕获阶段移除事件句柄,false(默认)-在冒泡阶段移除事件句柄
     */
    function removeEvent(ele, event, fn, useCapture) {
        useCapture = toBool(useCapture);
        ele.removeEventListener ? ele.removeEventListener(event, fn, useCapture) : ele.detachEvent("on" + event, fn, useCapture);
    }

    /**
     * 阻止特定事件的默认行为
     * @param {object} event -事件对象
     */
    function preventDefaultEvent(event) {
        event = event || window.event;//兼容IE
        //preventDefault W3C标准技术;returnValue 兼容IE
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        //用于处理使用对象属性注册的处理程序
        return false;
    }

    /**
     * 阻止事件(捕获和冒泡阶段)传播
     * @param {object} event -事件对象
     */
    function stopPropagationEvent(event) {
        event = event || window.event;
        //阻止捕获和冒泡阶段当前事件的进一步传播(IE是不支持事件捕获)
        //stopPropagation W3C标准；cancelBubble 兼容IE
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }

    /**
     * 在指定的元素节点上存取数据，返回设置值
     * @param {HTMLElement} el -dom节点对象
     * @param {string} key -可选。String类型 指定的键名字符串
     * @param {object} value -可选。 Object类型 需要存储的任意类型的数据
     * @returns {HTMLElement|object} 存数据时返回当前dom节点对象,取数据时则返回之前存的数据
     * @description HTMLElement类型 要存储数据的DOM对象。参数key,value都不为空则存数据，否则为取数据。都为空时取所有存储的数据
     */
    function elData(el, key, value) {
        var _dataname = '_elData', ktype = typeof(key), vtype = typeof(value);
        key = ktype === 'string' ? key.trim() : key;
        //set
        if (ktype !== 'undefined' && vtype !== 'undefined') {
            if (key === null || ktype === 'number' || ktype === 'boolean') {
                return el
            }
            if (!(_dataname in el)) {
                el[_dataname] = {}
            }
            el[_dataname][key] = value;
            return el
        }
        //get
        if (ktype === 'undefined' && vtype === 'undefined') {
            return el[_dataname] || {}
        }
        if (ktype !== 'undefined' && vtype === 'undefined') {
            return (_dataname in el && key in el[_dataname]) ? el[_dataname][key] : undefined
        }
    }

    /*
        /!**
         * 移除之前通过elData()法绑定的数据，返回当前dom节点
         * @param {HTMLElement} el -dom节点对象
         * @param {string} key -可选,规定要移除的数据的名称。如果没有规定名称，该方法将从被选元素中移除所有已存储的数据。
         * @returns {HTMLElement} 返回当前dom元素节点
         *!/
        function delElData(el, key) {
            var type = typeof(key), _dataname = '_elData';
            key = type === 'string' ? key.trim() : key;
            if (key === null || type === 'number' || type === 'boolean') {
                return el
            }
            if (type === 'undefined') {//remove all
                if (_dataname in el) delete el[_dataname]
            } else {
                if (_dataname in el && key in el[_dataname]) delete el[_dataname][key]
            }
            return el
        }
    */


    //#region slide平缓滑动动画效果

    /**
     * 获取dom元素的CSS属性的值
     * @param {HTMLElement} el -dom元素
     * @param {string} prop -css属性名
     * @returns {string}
     */
    function getStyle(el, prop) {
        return window.getComputedStyle ? getComputedStyle(el, null)[prop] : el.currentStyle[prop]
    }

    /**slide滑动收展节点元素,不考虑’border-box:box-sizing‘这种情况(可能卡顿收展不能平滑过渡)**/

    /**
     * 记录绑定一些与高度相关的css信息到节点元素上即便后面元素的css样式有变化也可以从中取得其原始值
     * @param {HTMLElement} el -dom元素
     */
    function markCss(el) {
        if (!elData(el, 'slide')) {
            elData(el, 'slide', true);
            elData(el, 'cssText', el.style.cssText);
            elData(el, 'borderTopWidth', getStyle(el, 'border-top-width'));
            elData(el, 'borderBottomWidth', getStyle(el, 'border-bottom-width'));
            elData(el, 'paddingTop', getStyle(el, 'padding-top'));
            elData(el, 'paddingBottom', getStyle(el, 'padding-bottom'));
            elData(el, 'height', getStyle(el, 'height'))
        }
        if (elData(el, 'height') === 'auto') {
            el.setAttribute('hidden', true);
            var c = el.style.cssText;
            el.style.cssText = 'display:block';
            elData(el, 'height', getStyle(el, 'height'));
            el.style.cssText = c;
            el.removeAttribute('hidden');
        }
    }

    /**
     * 获取当前状态中与元素高度相关的css样式值
     * @param {HTMLElement} el -dom节点对象
     * @returns {{bt: string, bb: string, pt: string, pb: string, h: string}}
     */
    function nowH(el) {
        return {
            bt: getStyle(el, 'border-top-width'),
            bb: getStyle(el, 'border-bottom-width'),
            pt: getStyle(el, 'padding-top'),
            pb: getStyle(el, 'padding-bottom'),
            h: getStyle(el, 'height'),
        }
    }

    /**
     * 获取最初始未有更改过的block状态中与元素高度相关的css样式值
     * @param {HTMLElement} el -dom节点对象
     * @returns {{css: (HTMLElement|Object), bt: (HTMLElement|Object), bb: (HTMLElement|Object), pt: (HTMLElement|Object), pb: (HTMLElement|Object), h: (HTMLElement|Object)}}
     */
    function endH(el) {
        return {
            css: elData(el, 'cssText'),
            bt: elData(el, 'borderTopWidth'),
            bb: elData(el, 'borderBottomWidth'),
            pt: elData(el, 'paddingTop'),
            pb: elData(el, 'paddingBottom'),
            h: elData(el, 'height'),
        }
    }

    /**
     * 以滑动方式隐藏节点
     * @param {HTMLElement} el -dom节点对象
     * @param {number} millisecond -滑动速度(完成滑动所需毫秒时间),默认值300
     */
    function slideUp(el, millisecond) {
        markCss(el);
        elData(el, 'slideToggle', 'slideup');
        var slide = Symbol('slide').toString(),
            now = nowH(el),
            end = endH(el),
            // bt = parseNum(end.bt),
            // bb = parseNum(end.bb),
            // pt = parseNum(end.pt),
            // pb = parseNum(end.pb),
            // h = parseNum(end.h),
            //total = h + pt + pb + bt + bb,
            //sum = total - (parseNum(now.bt) + parseNum(now.bb) + parseNum(now.pt) + parseNum(now.pb) + parseNum(now.h)),
            bt = parseNum(now.bt),
            bb =  parseNum(now.bb),
            pt =  parseNum(now.pt),
            pb = parseNum(now.pb) ,
            h = parseNum(now.h),
            total=(parseNum(now.bt) + parseNum(now.bb) + parseNum(now.pt) + parseNum(now.pb) + parseNum(now.h)),
            sum=0,
            finish = false,
            speed = (millisecond ? total / millisecond : total / 300) * 5;
        el.style.cssText = el.style.cssText + 'overflow:hidden;';
        clearInterval(el[slide]);
        el[slide] = setInterval(function () {
            if (finish) {
                clearInterval(el[slide]);
                el.style.cssText = end.css + 'display:none';
                if (slide in el) {
                    delete el[slide]
                }
            } else {
                sum += speed;
                if (bb - sum > 0) {
                    el.style.borderBottomWidth = bb - sum + 'px'
                } else {
                    el.style.borderBottomWidth = 0 + 'px';
                    if (bb + pb - sum > 0) {
                        el.style.paddingBottom = bb + pb - sum + 'px';
                    } else {
                        el.style.paddingBottom = 0 + 'px';
                        if (bb + pb + h - sum > 0) {
                            el.style.height = bb + pb + h - sum + 'px';
                        } else {
                            el.style.height = 0 + 'px';
                            if (bb + pb + h + pt - sum > 0) {
                                el.style.paddingTop = bb + pb + h + pt - sum + 'px';
                            } else {
                                el.style.paddingTop = 0 + 'px';
                                if (bb + pb + h + pt + bt - sum > 0) {
                                    el.style.borderTopWidth = bb + pb + h + pt + bt - sum + 'px';
                                } else {
                                    el.style.borderTopWidth = 0 + 'px';
                                    finish = true;
                                }
                            }
                        }
                    }
                }
            }
        }, 5);//间隔时间不要过小或过大,否则最终花费时间会与设定的完成时间误差较大,且设置间隔过大会卡顿没有平缓过度效果

    }

    /**
     * 以滑动方式显示节点
     * @param {HTMLElement} el -dom节点对象
     * @param {number} millisecond 滑动速度(完成滑动所需毫秒时间),默认值300
     */
    function slideDown(el, millisecond) {
        markCss(el);
        elData(el, 'slideToggle', 'slidedown');
        var slide = Symbol('slide').toString(),
            now = nowH(el),
            end = endH(el),
            bt = parseNum(end.bt),
            bb = parseNum(end.bb),
            pt = parseNum(end.pt),
            pb = parseNum(end.pb),
            h = parseNum(end.h),
            total = h + pt + pb + bt + bb,
            finish = false,
            speed = (millisecond ? total / millisecond : total / 300) * 5,
            sum = 0;
        if (getStyle(el, 'display') === 'none') {
            el.style.cssText = end.css + 'overflow:hidden;height:0;display:block;border-top-width:0;border-bottom-width:0;padding-top:0;padding-bottom:0;';
        } else {
            el.style.cssText = el.style.cssText + 'overflow:hidden';
            sum = parseNum(now.bt) + parseNum(now.bb) + parseNum(now.pt) + parseNum(now.pb) + parseNum(now.h);
        }
        clearInterval(el[slide]);
        el[slide] = setInterval(function () {
            if (finish) {
                clearInterval(el[slide]);
                el.style.cssText = end.css + 'display:block';
                if (slide in el) {
                    delete el[slide]
                }
            } else {
                sum += speed;
                if (bt - sum > 0) {
                    el.style.borderTopWidth = sum + 'px';
                } else {
                    el.style.borderTopWidth = bt + 'px';
                    if (bt + pt - sum > 0) {
                        el.style.paddingTop = sum - bt + 'px';
                    } else {
                        el.style.paddingTop = pt + 'px';
                        if (bt + pt + h - sum > 0) {
                            el.style.height = sum - bt - pt + 'px';
                        } else {
                            el.style.height = h + 'px';
                            if (bt + pt + h + pb - sum > 0) {
                                el.style.paddingBottom = sum - bt - pt - h + 'px';
                            } else {
                                el.style.paddingBottom = pb + 'px';
                                if (bt + pt + h + pb + bb - sum > 0) {
                                    el.style.borderBottomWidth = sum - bt - pt - h - pb + 'px';
                                } else {
                                    el.style.borderBottomWidth = bb + 'px';
                                    finish = true;
                                }
                            }
                        }
                    }
                }
            }
        }, 5);
    }

    /*
        /!**
         * dom元素以滑动方式在显示隐藏状态之间切换
         * @param {HTMLElement} el -dom节点对象
         * @param {number} millisecond 滑动速度(完成滑动所需毫秒时间),默认值300
         *!/
        function slideToggle(el, millisecond) {
            getStyle(el, 'display') === 'none'
            || elData(el, 'slideToggle') === 'slideup'
                ? slideDown(el, millisecond)
                : slideUp(el, millisecond);
        }
    */
    //#endregion

    //#endregion

    //#region 手风琴菜单

    /**
     * 手风琴菜单
     * @param {string|HTMLElement} el -容器元素的CSS选择器字符串或html对象
     * @param {object} options -配置项,也可从标签属性设置获取
     */
    function Accordion(el, options) {
        if (!(this instanceof Accordion)) {
            return new Accordion(el, options)
        }
        this.menu = (typeof $ !== "undefined" && el instanceof jQuery) && el.length > 0
            ? el[0]
            : typeof (el) === "string"
                ? document.querySelector(el)
                : (((typeof HTMLElement === 'object')
                    ? (el instanceof HTMLElement)
                    : (el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'))
                    ? el : null);
        //初始配置项
        this.options = {};
        this.menu.classList.add("accordion");
        this.init(options);
    }

    Accordion.prototype = {
        constructor: Accordion,
        /**
         * 初始化菜单
         * @param {object} options -配置项
         * @returns {Accordion}
         */
        init: function (options) {
            //若菜单节点中已绑定数据,直接从中取
            var lastOpts = elData(this.menu, 'lastOpts'),
                menu = this.menu;
            //初始化配置值,可从菜单已绑定数据或标签属性中或传入配置项中或取
            this.options = lastOpts || {
                idField: menu.getAttribute("idField") || "id",//字段名
                parentField: menu.getAttribute("parentField") || "pid",//父节点字段名
                nameField: menu.getAttribute("nameField") || "name",//节点显示文本
                iconField: menu.getAttribute("iconField") || "",//节点图标字段，如字体图标类
                sortName: menu.getAttribute("sortName") || "",//节点排序的字段名称
                sortOrder: menu.getAttribute("sortOrder") || "asc",//节点排序方式asc/desc
                childrenField: menu.getAttribute("childrenField") || "children",//子节点字段名
                url: menu.getAttribute("url") || "",//url加载数据初始化菜单。优先以传参data数组数据初始化菜单,若不传参则以url方式加载初始化
                ajaxType: menu.getAttribute('ajaxType') || 'get',//请求类型，默认get
                ajaxData: menu.getAttribute('ajaxData') || null,//请求参数数据
                asTreeData: menu.getAttribute('asTreeData') ? toBool(menu.getAttribute('asTreeData')) : true,//菜单数组数据是否以树状数组展示
                data: menu.getAttribute('data') || null,//初始化菜单的数据,url和data共存时优先使用data
                indentStep: menu.getAttribute("indentStep") || 1,//菜单层级缩进数值(单位em)
                startColor: menu.getAttribute("startColor") || '#18626b',//菜单开始背景色(HEX十六进制颜色码)
                endColor: menu.getAttribute("endColor") || '#2fb9ca',//菜单最终背景色(HEX十六进制颜色码)
                colorCount: menu.getAttribute("colorCount") || 5,//开始至结束每层级菜单背景色过渡段数
                speed: menu.getAttribute("speed") || 300,//滑动速度。菜单完成滑动展开/收缩所用时间(ms)
                onnodeclick: eval(menu.getAttribute("onnodeclick")) || null,//菜单节点点击fn(node,sender,ele,e)
                onnodemouseenter: eval(menu.getAttribute("onnodemouseenter")) || null,//鼠标进入节点fn(node,sender,ele,e)
                onnodemouseleave: eval(menu.getAttribute("onnodemouseleave")) || null,//鼠标离开节点fn(node,sender,ele,e)
                onmenuready: eval(menu.getAttribute("onmenuready")) || null//菜单加载渲染完后fn(sender)
            };
            this.options = extend(this.options, options || {}, true);
            var opts = this.options,
                _this = this,
                colorList = gradientColors(opts.startColor, opts.endColor, opts.colorCount);
            setOpts();
            render();
            bindEvent();
            return this;

            //#region init
            function setOpts() {
                opts.ajaxData = parseObj(opts.ajaxData);
                opts.data = parseObj(opts.data);
                if (!opts.data) {
                    urlGetData()
                }
                opts.data = getFmtData(opts.asTreeData);
                if (opts.asTreeData) {
                    elData(menu, 'tree', opts.data);
                    elData(menu, 'list', getFmtData(!opts.asTreeData))
                } else {
                    elData(menu, 'list', opts.data);
                    elData(menu, 'tree', getFmtData(!opts.asTreeData))
                }
                if (!lastOpts) {
                    //清除标签自定义属性
                    for (var k in opts) {
                        menu.removeAttribute(k);
                    }
                }
                //将配置项数据绑定到菜单可下次获取
                elData(menu, 'lastOpts', opts);
            }

            /**
             * 根据url初始化菜单的数据
             */
            function urlGetData() {
                var url = _this.options.url,
                    type = _this.options.ajaxType,
                    json = _this.options.ajaxData;
                if (url) {
                    var xhr = createRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            _this.options.data = typeof xhr.responseText === 'string' ? JSON.parse(xhr.responseText) : xhr.responseText;
                        }
                    };
                    if (type && type.toLowerCase() === 'post') {
                        xhr.open('post', url, false);
                        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
                        xhr.send(JSON.stringify(json));
                    } else {
                        if (json) {
                            var prms = '';
                            for (var k in json) {
                                prms += '&' + k + '=' + json[k];
                            }
                            url += url.indexOf('?') !== -1 ? prms : prms.replace('&', '?');
                        }
                        xhr.open('get', url, false);
                        xhr.send(null);
                    }
                }
                else {
                    _this.options.data = []
                }
            }

            /**
             * 渲染生成菜单
             */
            function render() {
                _this.menu.innerHTML = '';
                createUl(_this.getData(true), _this.menu, null, 1);
                // 处理菜单层级缩进
                menuIndent();
                //菜单渲染完回调函数
                opts.onmenuready && eval(opts.onmenuready) && eval(opts.onmenuready)(_this);
            }

            /**
             * 创建ul菜单块
             * @param {array} data -必需。生成菜单的数据数组
             * @param {HTMLElement} box -必需。当前创建菜单块的容器节点
             * @param {string|number|object} pid -可选。上级菜单id
             * @param {number} lv -当前菜单层级数
             */
            function createUl(data, box, pid, lv) {
                var ul = document.createElement('ul');
                data.forEach(function (item) {
                    var li = createLi(item);
                    //赋值当前节点数据，并将该数据绑定到该节点标签中
                    var sender = {
                        node: copyObj(item),//当前项
                        level: lv,
                        isLeaf: false//是否叶子节点
                    };
                    //删除该节点的子节点数组数据，只保留自身数据
                    if (opts.childrenField in sender.node) delete sender.node[opts.childrenField];
                    sender.node[opts.parentField] = pid;
                    //设置每层级菜单背景色
                    li.querySelector("a.menuitem").style.background = lv < colorList.length + 1 ? colorList[lv - 1] : colorList[colorList.length - 1];
                    //绑定数据到标签中
                    elData(li.querySelector(":scope>.menuitem"), 'sender', sender);
                    if (item[opts.childrenField] && item[opts.childrenField].length > 0) {
                        li.querySelector('a').classList.add('submenu');
                        //创建子菜单
                        var subLv = lv + 1;
                        createUl(item[opts.childrenField], li, item[opts.idField], subLv);
                    } else {
                        sender.isLeaf = true;
                    }
                    ul.appendChild(li);
                });
                box.appendChild(ul);
            }

            /**
             * 创建li菜单节点
             * @param {object} item -菜单节点数据
             * @returns {HTMLLIElement}
             */
            function createLi(item) {
                var iconClass = opts.iconField ? (item[opts.iconField] ? item[opts.iconField] : 'noicon') : "";
                var li = document.createElement('li');
                var a = document.createElement('a');
                var i = document.createElement('i');
                var txt = document.createTextNode(item[opts.nameField]);
                a.setAttribute('class', 'menuitem');
                a.setAttribute('data-id', typeof item[opts.idField] === 'string' ? item[opts.idField].trim() : item[opts.idField]);
                iconClass && i.setAttribute('class', iconClass);
                a.appendChild(i);
                a.appendChild(txt);
                li.appendChild(a);
                return li;
            }

            /**
             * 处理菜单层级文本缩进
             */
            function menuIndent() {
                var ul = _this.menu.querySelector('.accordion>ul'),
                    indent = 0,
                    step = parseFloat(opts.indentStep);
                step = isNaN(step) ? 1 : step;
                nodeIndent(ul, indent);

                function nodeIndent(ul, indent) {
                    var uls = ul.querySelectorAll(':scope>li>ul');//':scope'若有兼容问题,请使用下面注释方法setItem?
                    indent = parseFloat(indent) + step;
                    uls.forEach(function (item) {
                        var a = item.querySelectorAll(':scope>li>a');
                        a.forEach(function (m) {
                            m.style.paddingLeft = indent + 'em';
                        });
                        nodeIndent(item, indent);
                    })
                }

                /*
                function nodeIndent(ul, indent) {
                    indent = parseFloat(indent) + step;
                    var c = ul.children;
                    for (var i = 0; i < c.length; i++) {
                        if (c[i].tagName === 'LI') {
                            var s = c[i].children;
                            for (var j = 0; j < s.length; j++) {
                                if (s[j].tagName === 'UL') {
                                    var l = s[j].children;
                                    for (var k = 0; k < l.length; k++) {
                                        if (l[k].tagName === 'LI') {
                                            var a = l[k].children;
                                            for (var m = 0; m < a.length; m++) {
                                                if (a[m].tagName === 'A') {
                                                    a[m].style.paddingLeft = indent + 'em';
                                                }
                                            }
                                        }
                                    }
                                    nodeIndent(s[j], indent);
                                }
                            }
                        }
                    }
                }
                */
            }

            /**
             * 菜单节点绑定事件
             */
            function bindEvent() {
                _this.menu.querySelectorAll('a.menuitem').forEach(function (item) {
                    // //解绑hover和click事件
                    removeEvent(item, 'click', clickFn, false);
                    removeEvent(item, 'mouseenter', enterFn, false);
                    removeEvent(item, 'mouseleave', leaveFn, false);
                    //绑定hover和click事件
                    addEvent(item, 'click', clickFn, false);
                    addEvent(item, 'mouseenter', enterFn, false);
                    addEvent(item, 'mouseleave', leaveFn, false);
                });

                //绑定事件 event
                /**
                 * 鼠标在节点上
                 * @param e
                 */
                function enterFn(e) {
                    this.setAttribute('title', this.innerText);
                    /**
                     * 鼠标进入菜单节点事件回调函数
                     *@param {object} sender 菜单控件对象及节点信息
                     *@param {object} e event对象
                     * */
                    opts.onnodemouseenter && eval(opts.onnodemouseenter)(copyObj(elData(this, 'sender')),_this,this, e);
                    preventDefaultEvent(e);
                    stopPropagationEvent(e);
                }

                /**
                 * 鼠标离开节点
                 * @param e
                 */
                function leaveFn(e) {
                    this.removeAttribute('title');
                    /**
                     * 鼠标离开菜单节点事件回调函数
                     *@param {object} sender 菜单控件对象及节点信息
                     *@param {object} e event对象
                     * */
                    opts.onnodemouseleave && eval(opts.onnodemouseleave)(copyObj(elData(this, 'sender')),_this,this,e);
                    preventDefaultEvent(e);
                    stopPropagationEvent(e);
                }

                //或用js原生方法animate()实现滑动动画
                /**
                 * 点击节点滑动收展菜单
                 * @param e
                 */
                function clickFn(e) {
                    var speed = _this.options.speed, _self = this;
                    if (this.classList.contains('submenu')) {//有子菜单，则展开或折叠
                        if (this.classList.contains('iconopen')) {
                            this.parentNode.querySelectorAll('.iconopen,ul').forEach(function (o) {
                                o.tagName === 'A' ? o.classList.remove('iconopen') :getStyle(o,'display')!=='none'?slideUp(o, speed):'';
                            });
                        } else {
                            this.classList.add('iconopen');
                            // 若':scope'伪选择器有兼容性问题可使用下面注释代码代替
                            this.parentNode.parentNode.querySelectorAll(':scope>li>a').forEach(function (item) {
                                if (item !== _self) {
                                    item.parentNode.querySelectorAll('.iconopen,ul').forEach(function (o) {
                                        o.tagName === 'A' ? o.classList.remove('iconopen') :getStyle(o,'display')!=='none'?slideUp(o, speed):'';
                                    });
                                } else {
                                    var sub = item.parentNode.querySelector('ul');
                                    sub && slideDown(sub, speed);
                                }
                            });

                            /*
                            var lis = this.parentNode.parentNode.children;
                            for (var i = 0; i < lis.length; i++) {
                                if (lis[i] !== this.parentNode) {
                                    lis[i].querySelectorAll('.iconopen,ul').forEach(function (o) {
                                        o.tagName === 'A' ? o.classList.remove('iconopen') : slideUp(o, speed)
                                    });
                                } else {
                                    var subUl = lis[i].children;
                                    for (var k = 0; k < subUl.length; k++) {
                                        if (subUl[k].tagName === 'UL') {
                                            slideDown(subUl[k], speed);
                                        }
                                    }
                                }
                            }
                            */
                        }
                    }
                    _this.menu.querySelectorAll('a.menuitem').forEach(function (item) {
                        item.classList.remove('activeitem');
                    });
                    this.classList.add('activeitem');
                    /**
                     * 鼠标进入菜单节点事件回调函数
                     *@param {object} sender -菜单控件对象及节点信息
                     *@param {object} e -事件对象
                     * */
                    opts.onnodeclick && eval(opts.onnodeclick)(copyObj(elData(this, 'sender')),_this,this, e);
                    preventDefaultEvent(e);
                    stopPropagationEvent(e);
                }

                /*
                                                /!**
                                                 * 点击节点收展菜单(无平缓滑动效果)
                                                 * @param e
                                                 *!/
                                                function clickFn(e) {
                                                    if (this.classList.contains('submenu')) {//有子菜单，则展开或折叠
                                                        if (this.classList.contains('iconopen')) {
                                                            this.parentNode.querySelectorAll('.iconopen,ul').forEach(function(o){
                                                                o.tagName==='A'?o.classList.remove('iconopen'):o.classList.remove('itemshow');
                                                            });
                                                        } else {
                                                            this.classList.add('iconopen');
                                                            var s = this.parentNode.parentNode.children;
                                                            for (var i = 0; i < s.length; i++) {
                                                                if (s[i] !== this.parentNode) {
                                                                    s[i].querySelectorAll('.iconopen,ul').forEach(function (o) {
                                                                        o.tagName==='A'?o.classList.remove('iconopen'):o.classList.remove('itemshow');
                                                                    });
                                                                }else{
                                                                    for(var k=0;k<s[i].children.length;k++){
                                                                        if(s[i].children[k].tagName==='UL'){
                                                                            s[i].children[k].classList.add('itemshow');
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    _this.menu.querySelectorAll('a.menuitem').forEach(function (item) {
                                                        item.classList.remove('activeitem');
                                                    });
                                                    this.classList.add('activeitem');
                                                    /!**
                                                     * 鼠标进入菜单节点事件回调函数
                                                     *@param {object} sender -菜单控件对象及节点信息
                                                     *@param {object} e -事件对象
                                                     * *!/
                                                    opts.onnodeclick && eval(opts.onnodeclick)(copyObj(elData(this, 'sender')),_this,this,e);
                                                    preventDefaultEvent(e);
                                                    stopPropagationEvent(e);
                                                }
                */
            }

            /**
             * 获取指定结构的菜单数据数组
             * @param {boolean} asTree -数组是否以树状结构数组展示
             * @returns {Array}
             */
            function getFmtData(asTree) {
                var data = copyObj(opts.data), arr = [];
                asTree = typeof asTree === 'undefined' ? toBool(opts.asTreeData) : toBool(asTree);
                if (asTree) {
                    for (var i = 0; i < data.length; i++) {
                        //是否叶子节点，从叶子节点开始到跟节点逐步构建TreeData格式数据
                        var isLeaf = true;
                        for (var k = 0; k < data.length; k++) {
                            //节点id是其它节点pid，不是叶子节点
                            if (data[i][opts.idField] === data[k][opts.parentField]) {
                                isLeaf = false
                            }
                        }
                        //如果是叶子节点，将叶子节点加到父节点的children数组内
                        if (isLeaf) {
                            for (var j = 0; j < data.length; j++) {
                                if (data[j][opts.idField] === data[i][opts.parentField]) {
                                    //若children属性不存在或不是数组，则默认设置为空数组
                                    if (!opts.childrenField in data[j] || !Array.isArray(data[j][opts.childrenField])) data[j][opts.childrenField] = [];
                                    //删除其pid属性
                                    if (opts.parentField in data[i]) delete data[i][opts.parentField];
                                    data[j][opts.childrenField].push(data[i]);
                                    //添加到父项后删除原数组该项，并重新遍历数组
                                    data.splice(i, 1);
                                    i = -1;//重置i值,++后重0重新开始循环
                                    break;
                                }
                            }
                        }
                    }
                    //删除第一维数组各项的pid属性
                    for (var i = 0; i < data.length; i++) {
                        if (opts.parentField in data[i]) delete data[i][opts.parentField];
                    }
                    //将数组先排序在返回数组
                    return sortTreeArr(data, opts.childrenField, opts.sortName, opts.sortOrder);
                } else {
                    toArr(data, arr, null);
                    return sortArr(arr, opts.sortOrder, opts.sortName)
                }

                function toArr(data, arr, pid) {
                    for (var i = 0; i < data.length; i++) {
                        //赋值对象值并进行修改而不影响被复制对象的值
                        var obj = copyObj(data[i]);
                        obj[opts.parentField] = opts.parentField in data[i] ? data[i][opts.parentField] : pid;
                        //删除子节点数组属性
                        if (opts.childrenField in obj) delete obj[opts.childrenField];
                        arr.push(obj);
                        //对有子节点数组属性的节点递归
                        if (opts.childrenField in data[i]) toArr(data[i][opts.childrenField], arr, data[i][opts.idField]);
                    }
                }
            }

            //#endregion;
        },
        /**
         * 获取菜单数据数组
         * @param {boolean} asTree -可选。数组是否以树状结构数组展示,默认取决初始化配置属性asTreeData
         * @returns {array}
         */
        getData: function (asTree) {
            asTree = typeof asTree === 'undefined' ? toBool(this.options.asTreeData) : toBool(asTree);
            return copyObj(asTree ? elData(this.menu, 'tree') : elData(this.menu, 'list'))
        },
        /**
         * 根据节点id获取节点
         * @param {*} id -要获取节点的id
         * @returns {object}
         */
        getNode: function (id) {
            var node = this.menu.querySelector("[data-id='" + id + "']");
            return copyObj(node ? elData(node, "sender").node : null)
        },
        /**
         * 获取目标节点的父节点
         * @param {object} node -目标节点
         * @returns {object}
         */
        getParentNode: function (node) {
            return this.getNode(node[this.options.parentField])
        },
        /**
         * 获取当前选中的节点
         * @returns {object}
         */
        getSelectNode: function () {
            return copyObj(elData(this.menu.querySelector("a.activeitem"), "sender").node)
        },
        /**
         * 获取目标节点的子节点
         * @param {object} node -目标节点
         * @param {boolean} asTree -可选。数组是否以树状结构数组展示,默认取决初始化配置属性asTreeData
         * @param {boolean} deep -可选。是否获取该节点下所有子孙节点,默认false
         * @returns {array}
         */
        getChildNodes: function (node, asTree, deep) {
            asTree = typeof asTree === 'undefined' ? toBool(this.options.asTreeData) : toBool(asTree);
            deep = toBool(deep);
            var opts = this.options,
                data = copyObj(this.getData(asTree)),
                arr = [];
            if (asTree) {
                getTree(data);
            } else {
                getList(node[opts.idField]);
            }

            //list children
            function getList(pid) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][opts.parentField] === pid) {
                        arr.push(data[i]);
                        deep && getList(data[i][opts.idField]);
                        data.splice(i, 1);
                        i = 0;
                    }
                }
                return arr
            }

            //tree children
            function getTree(data) {
                data.forEach(function (item) {
                    if (item[opts.idField] === node[opts.idField]) {
                        if (!(opts.childrenField in item) || item[opts.childrenField].length === 0) {
                            arr = [];
                            return arr
                        } else {
                            arr = item[opts.childrenField];
                            if (!deep) {
                                arr.forEach(function (obj) {
                                    if (opts.childrenField in item) {
                                        delete obj[opts.childrenField]
                                    }
                                });
                            }
                            return arr
                        }
                    }
                    else {
                        if ((opts.childrenField in item) && item[opts.childrenField].length > 0) {
                            getTree(item[opts.childrenField]);
                        }
                    }
                });
            }

            return arr
        }
    };

    //#endregion

    //jQuery
    if (typeof $ !== "undefined") {
        $.fn.accordion = function () {
            var data = this.removeData("accordion"),
                options = $.extend(true, {}, $.fn.accordion.data, arguments[0]);
            data = new Accordion(this, options);
            this.data("accordion", data);
            return $.extend(true, this, data)
        };
        $.fn.accordion.constructor = Accordion
    }

    return Accordion
});
