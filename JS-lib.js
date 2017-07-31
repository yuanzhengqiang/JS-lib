class JS_lib {
	//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
	trim(str,type){
	    switch (type){
	        case 1:return str.replace(/\s+/g,"");
	        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
	        case 3:return str.replace(/(^\s*)/g, "");
	        case 4:return str.replace(/(\s*$)/g, "");
	        default:return str;
	    }
	}

	/*字母大小写切换
	type:
	1: 首字母大写   
	2：首页母小写
	3：大小写转换
	4：全部大写
	5：全部小写
	*/
	changeCase(str,type) {
	    function ToggleCase(str) {
	        var itemText = ""
	        str.split("").forEach(
	            function (item) {
	                if (/^([a-z]+)/.test(item)) {
	                    itemText += item.toUpperCase();
	                }
	                else if (/^([A-Z]+)/.test(item)) {
	                    itemText += item.toLowerCase();
	                }
	                else{
	                    itemText += item;
	                }
	            });
	        return itemText;
	    }
	 
	    switch (type) {
	        case 1:
	            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
	                return v1.toUpperCase() + v2.toLowerCase();
	            });
	        case 2:
	            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
	                return v1.toLowerCase() + v2.toUpperCase();
	            });
	        case 3:
	            return ToggleCase(str);
	        case 4:
	            return str.toUpperCase();
	        case 5:
	            return str.toLowerCase();
	        default:
	            return str;
	    }
	}

	/*字符串循环复制
	str: 字符串
	count: 次数
	*/
	repeatStr(str, count) {
	    var text = '';
	    for (var i = 0; i < count; i++) {
	        text += str;
	    }
	    return text;
	}

	//字符串替换(字符串,要替换的字符,替换成什么)
	replaceAll(str,AFindText,ARepText){
		raRegExp = new RegExp(AFindText,"g");
		return str.replace(raRegExp,ARepText);
	}

	//替换*
	//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
	replaceStr(str, regArr, type,ARepText) {
	    var regtext = '', Reg = null,replaceText=ARepText||'*';
	    //replaceStr('18819322663',[3,5,3],0)
	    //188*****663
	    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
	    if (regArr.length === 3 && type === 0) {
	        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
	        Reg = new RegExp(regtext);
	        var replaceCount = repeatStr(replaceText, regArr[1]);
	        return str.replace(Reg, '$1' + replaceCount + '$2')
	    }
	    //replaceStr('asdasdasdaa',[3,5,3],1)
	    //***asdas***
	    else if (regArr.length === 3 && type === 1) {
	        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
	        Reg = new RegExp(regtext);
	        var replaceCount1 = repeatSte(replaceText, regArr[0]);
	        var replaceCount2 = repeatSte(replaceText, regArr[2]);
	        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
	    }
	    //replaceStr('1asd88465asdwqe3',[5],0)
	    //*****8465asdwqe3
	    else if (regArr.length === 1 && type == 0) {
	        regtext = '(^\\w{' + regArr[0] +  '})'
	        Reg = new RegExp(regtext);
	        var replaceCount = repeatSte(replaceText, regArr[0]);
	        return str.replace(Reg, replaceCount)
	    }
	    //replaceStr('1asd88465asdwqe3',[5],1,'+')
	    //"1asd88465as+++++"
	    else if (regArr.length === 1 && type == 1) {
	        regtext = '(\\w{' + regArr[0] +  '}$)'
	        Reg = new RegExp(regtext);
	        var replaceCount = repeatSte(replaceText, regArr[0]);
	        return str.replace(Reg, replaceCount)
	    }
	}

	//检测字符串
	//checkType('165226226326','phone')
	checkType (str, type) {
	    switch (type) {
	        case 'email':
	            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
	        case 'phone':
	            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
	        case 'tel':
	            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
	        case 'number':
	            return /^[0-9]$/.test(str);
	        case 'english':
	            return /^[a-zA-Z]+$/.test(str);
	        case 'chinese':
	            return /^[\u4E00-\u9FA5]+$/.test(str);
	        case 'lower':
	            return /^[a-z]+$/.test(str);
	        case 'upper':
	            return /^[A-Z]+$/.test(str);
	        default :
	            return true;
	    }
	}

	//检测密码强度
	checkPwd(str) {
	    var nowLv = 0;
	    if (str.length < 6) {
	        return nowLv
	    }
	    ;
	    if (/[0-9]/.test(str)) {
	        nowLv++
	    }
	    ;
	    if (/[a-z]/.test(str)) {
	        nowLv++
	    }
	    ;
	    if (/[A-Z]/.test(str)) {
	        nowLv++
	    }
	    ;
	    if (/[\.|-|_]/.test(str)) {
	        nowLv++
	    }
	    ;
	    return nowLv;
	}

	//随机码
	randomNumber(count){
	   return Math.random().toString(count).substring(2);
	}

	//查找字符串中某些字符串的数量
	countStr (str,strSplit) {
	    return str.split(strSplit).length-1
	}

	
	funcArray (arr, type) {
	    switch (type) {
	        case 'removeRepeat'://数组去重
	            return Array.from(new Set(arr))
	        case 'upset':  //数组顺序打乱
	            return arr.sort(function(){ return Math.random() - 0.5});
	        case 'max'://数组最大值
	            return Math.max.apply(null,arr);
	        case 'min'://数组最小值
	            return Math.min.apply(null,arr);
	        case 'sum'://数组求和
	            var sumText=0;
				for(var i=0,len=arr.length;i<len;i++){
					sumText+=arr[i];
				}
				return sumText
	        case 'average':
	            var sumText=sumArr(arr);
				var covText=sumText/length;
				return covText
	        case 'random'://数组随机元素
	            return arr[Math.floor(Math.random() * arr.length)];
	        default :
	            return true;
	    }
	}

	//元素出现的次数
	getEleCount (obj, ele) {
	    var num = 0;
	    for (var i = 0, len = obj.length; i < len; i++) {
	        if (ele == obj[i]) {
	            num++;
	        }
	    }
	    return num;
	}

	//数组（字符串）出现最多的几次元素和出现次数
	//arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
	getCount(arr, rank，ranktype){ 
	    var obj = {}, k, arr1 = []
	    //记录每一元素出现的次数
	    for (var i = 0, len = arr.length; i < len; i++) {
	        k = arr[i];
	        if (obj[k]) {
	            obj[k]++;
	        }
	        else {
	            obj[k] = 1;
	        }
	    }
	    //保存结果{el-'元素'，count-出现次数}
	    for (var o in obj) {
	        arr1.push({el: o, count: obj[o]});
	    }
	    //排序（降序）
	    arr1.sort(function (n1, n2) {
	        return n2.count - n1.count
	    });
	    //如果ranktype为1，则为升序，反转数组
	    if(ranktype===1){
	        arr1=arr1.reverse();
	    }
	    var rank1 = rank || arr1.length;
	    return arr1.slice(0,rank1);
	}

	//n1-n2下标的数组
	getArrayNum(arr,n1,n2){
	    var arr1=[],len=n2||arr.length-1;
	    for(var i=n1;i<=len;i++){
	        arr1.push(arr[i])
	    }
	    return arr1;
	}

	//筛选数组
	removeArrayForValue(arr,val,type){
	    arr.filter(function(item){return type==='%'?item.indexOf(val)!==-1:item!==val})
	}

	//检测对象是否有哪个类名
	hasClass(obj,classStr){ 
	    var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含 
	    return (arr.indexOf(classStr)==-1)?false:true;
	}

	//添加类名
	addClass(obj,classStr){
	    if (!this.hasClass(obj,classStr)){obj.className += " " + classStr};
	}

	//删除类名
	removeClass(obj,classStr){
	    if (this.hasClass(obj,classStr)) {
	        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
	    }
	}

	//替换类名("被替换的类名","替换的类名")
	replaceClass(obj,newName,oldName) {
	    removeClass(obj,oldName);
	    addClass(obj,newName);
	}

	//获取兄弟节点
	siblings(obj){
	    var a=[];//定义一个数组，用来存o的兄弟元素 
	    var p=obj.previousSibling; 
	    while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
	        if(p.nodeType===1){ 
	        a.push(p); 
	        } 
	        p=p.previousSibling//最后把上一个节点赋给p 
	    } 
	    a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 
	    var n=obj.nextSibling;//再取o的弟弟 
	    while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思 
	        if(n.nodeType===1){ 
	            a.push(n); 
	        } 
	        n=n.nextSibling; 
	    }
	    return a;
	}

	//设置样式
	css(obj,json){
	    for(var attr in json){
	        obj.style[attr]=json[attr];
	    }
	}

	//设置文本内容
	html(obj){
	    if(arguments.length==0){
	        return this.innerHTML;
	    }
	    else if(arguments.length==1){
	        this.innerHTML=arguments[0];
	    }
	}

	//设置显示
	show(obj){
	    obj.style.display="";
	}

	//设置隐藏
	hide(obj){
	    obj.style.display="none";
	}


	//设置cookie
	setCookie(name,value,iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=name+'='+value+';expires='+oDate;
	}

	//获取cookie
	getCookie(name){
		var arr=document.cookie.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');
			if (arr2[0]==name) {
	 			return arr2[1];
			}
		}
		return '';
	}

	//删除cookie
	removeCookie(name){
		setCookie(name,1,-1);
	}

	//清除对象中值为空的属性
	filterParams(obj){
	    let _newPar = {};
	    for (let key in obj) {
	        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
	            _newPar[key] = obj[key];
	        }
	    }
	    return _newPar;
	}

	//现金额大写转换
	upDigit(n) {  
	    var fraction = ['角', '分','厘'];  
	    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
	    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
	    var head = n < 0? '欠人民币': '人民币';  
	    n = Math.abs(n);  
	    var s = '';  
	    for (var i = 0; i < fraction.length; i++)   
	    {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
	    } 
	    s = s || '整';  
	    n = Math.floor(n);  
	    for (var i = 0; i < unit[0].length && n > 0; i++)   
	    {  
	        var p = '';  
	        for (var j = 0; j < unit[1].length && n > 0; j++)   
	        {  
	            p = digit[n % 10] + unit[1][j] + p; 
	            n = Math.floor(n / 10);
	        }
	        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s; 
	        s = p+ unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	}

	//获取url参数
	getUrlPrmt(url) {
	    url = url ? url : window.location.href;
	    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
	    for (let i = 0, _len = _arrS.length; i < _len; i++) {
	        let pos = _arrS[i].indexOf('=');
	        if (pos == -1) {
	            continue;
	        }
	        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
	        _rs[name] = value;
	    }
	    return _rs;
	}

	//设置url参数
	setUrlPrmt(obj) {
	    let _rs = [];
	    for (let p in obj) {
	        if (obj[p] != null && obj[p] != '') {
	            _rs.push(p + '=' + obj[p])
	        }
	    }
	    return _rs.join('&');
	}

	//随机返回一个范围的数字
	randomNumber(n1,n2){
	    //randomNumber(5,10)
	    //返回5-10的随机整数，包括5，10
	    if(arguments.length===2){
	        return Math.round(n1+Math.random()*(n2-n1));
	    }
	    //randomNumber(10)
	    //返回0-10的随机整数，包括0，10
	    else if(arguments.length===1){
	        return Math.round(Math.random()*n1)
	    }
	    //randomNumber()
	    //返回0-255的随机整数，包括0，255
	    else{
	        return Math.round(Math.random()*255)
	    }  
	}

	//随进产生颜色
	randomColor(){
	    //randomNumber是上面定义的函数
	    //写法1
	    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';
	     
	    //写法2
	    return '#'+Math.random().toString(16).substring(2).substr(0,6);
	     
	    //写法3
	    var color='#';
	    for(var i=0;i<6;i++){
	        color+='0123456789abcdef'[randomNumber(15)];
	    }
	    return color;
	}

	//到某一个时间的倒计时
	getEndTime(endTime){
	    var startDate=new Date();  //开始时间，当前时间
	    var endDate=new Date(endTime); //结束时间，需传入时间参数
	    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
	    var d=0,h=0,m=0,s=0;
	    if(t>=0){
	      d=Math.floor(t/1000/3600/24);
	      h=Math.floor(t/1000/60/60%24);
	      m=Math.floor(t/1000/60%60);
	      s=Math.floor(t/1000%60);
	    } 
	    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
	}

	//适配rem
	getFontSize(){
	    var doc=document,win=window;
	    var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
	        if(clientWidth>750){clientWidth=750}
	        //设置根元素font-size大小
	        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	    };
	    //屏幕大小改变，或者横竖屏切换时，触发函数
	    win.addEventListener(resizeEvt, recalc, false);
	    //文档加载完成时，触发函数
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	}
}