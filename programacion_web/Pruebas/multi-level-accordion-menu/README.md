# Accordion Menu

![Accordion](https://github.com/Ivenluffy/Jquery-Accordion-Menu/blob/main/images/accordion.png)
![Accordion](https://github.com/Ivenluffy/Jquery-Accordion-Menu/blob/main/images/accordion1.png)
### 使用1：
    <div id='menu'></div>
    
    //js
    var opts = {
        idField: 'Id',//字段名
        parentField: 'ParentId',//父节点字段名
        nameField: 'MenuName',//节点显示文本字段名
        iconField:'MenuIcon',//节点图标字段，可对应用于bootstrap等的字体图标类名
        sortName:'Seq',//节点排序的字段名称
        sortOrder:'asc',//节点排序方式asc/desc
        childrenField: 'children',//子节点字段名
        url: '',//url加载数据初始化菜单。优先以传参data数组数据初始化菜单,若不传参则以url方式加载初始化
        ajaxType:'',//请求类型，默认get
        ajaxData:'',//请求参数数据
        asTreeData:false,//菜单数组数据是否以树状数组展示
        data: json,//初始化菜单的数据,url和data共存时优先使用data
        indentStep:1,//菜单层级缩进数值(单位em)
        startColor:'#18626b',//菜单开始背景色(HEX十六进制颜色码)
        endColor:'#2fb9ca',//菜单最终背景色(HEX十六进制颜色码)
        colorCount:'5',//开始至结束背景色过渡段数
        speed:500,//滑动速度。菜单滑动展开/收缩所用时间(ms)
        onnodeclick: clickFn,//菜单节点点击
        onnodemouseenter:enterFn,//鼠标进入节点
        onnodemouseleave:leaveFn,//鼠标离开节点
        onmenuready:renderFn//菜单加载渲染完后
    };
    //new Accordion("#menu",opts);
	$("#menu").accordion(opts);
### 使用2：
    <div class="menu" idField="Id" parentField="ParentId" nameField="MenuName" iconField="MenuIcon"
         sortName="Seq" sortOrder="asc" childrenField="children" url="data/tree.json" ajaxType="get"
         ajaxData='{"name":"test"}' asTreeData="true" data="" indentStep="0.5" startColor="#000" endColor="#ccc"
         colorCount="4" speed="500" onnodeclick="clickFn" onnodemouseenter="enterFn" onnodemouseleave="leaveFn"
         onmenuready="renderFn">
    </div>
    
    //js
    //new Accordion(".menu");
	$(".menu").accordion();
