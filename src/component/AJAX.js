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
    isHead && isHead.length == undefined ?xhr.setRequestHeader(isHead.head,isHead.value):'';
    if(isHead && isHead.length>1){
        for(let i = 0;i<isHead.length;i++){
            xhr.setRequestHeader(isHead[i].head,isHead[i].value)
        }
    }
    params?xhr.send(params):xhr.send();
}