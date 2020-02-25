export const AJAX = function(url,method,params,isHead,callback,error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if((xhr.readyState == 4 && xhr.status >=200 && xhr.status <300) ||(xhr.status == 304)){
            callback(xhr.response);
        }else if(xhr.status >=400){
            error(xhr.response);
        }
    }
    xhr.timeout = function(){
        alert('当前请求已超时,是否刷新重试');
    }
    xhr.open(method,url);
    isHead?xhr.setRequestHeader(isHead.head,isHead.value):'';
    params?xhr.send(params):xhr.send();
}