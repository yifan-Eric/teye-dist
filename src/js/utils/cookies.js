const defaultDuration = 1000*60*60;//默认一小时

//写cookies
export function setCookie(c_name, value, expireTime){
    var exdate=new Date();
    exdate.setTime(exdate.getTime() + expireTime||defaultDuration);
    // document.cookie=c_name+ "=" + escape(value) + ((expireTime==null) ? "" : ";expires="+exdate.toGMTString());
    document.cookie=c_name+ "=" + escape(value) + (";expires="+exdate.toGMTString());
}

//写cookies（设置作用域）
export function setCookieWithScope(name,value,expireTime){
    var exp = new Date();
    exp.setTime(exp.getTime() + expireTime||defaultDuration);
    let hostname = location.hostname.substring(location.hostname.indexOf(".")+1)  //设置为一级域名
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";domain="+hostname+";path=/";
}


//读取cookies
export function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookies
export function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//删除cookies（有作用域的）
export function delCookieWithScope(name){
    var exp = new Date();
    var name = "access_token";
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null){
        let hostname = location.hostname.substring(location.hostname.indexOf(".")+1)
        document.cookie= name + "='';expires="+exp.toGMTString()+";domain="+hostname+";path=/";
    }
}
