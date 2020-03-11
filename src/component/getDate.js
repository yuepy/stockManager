export const getDate = function(type,str){
    //获取当前日期  type为获取 月 或者 天;  str 为 日期间隔符 - 或 /
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var day = date.getDate();
    if(type == 'month'){
        return year+str+month;
    }
    if(type == 'day'){
        return year+str+month+str+day;
    }
}