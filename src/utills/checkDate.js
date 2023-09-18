export const CheckDate = (date) => {
    var date_time = new Date();
    var year_now  = date_time.getFullYear().toString();
    var date_now = date_time.toLocaleDateString()
    var month_now_word = new Date().toLocaleString('ru', {       
        month: 'long'
    });
    
    if (date.match(/\d\d.\d\d.\d\d\d\d/)) {
        return date == `${date_now}` 
        ? true
        : false
    } else {
        return date.toLowerCase() == `${month_now_word} ${year_now}` 
        ? true 
        : false
    }
}