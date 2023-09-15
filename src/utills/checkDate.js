export const CheckDate = async (date) => {
    var date_time = new Date();
    var year_now  = date_time.getFullYear().toString();
    var day_now = ("0" + date_time.getDate()).slice(-2).toString();
    var month_now = ("0" + (date_time.getMonth() + 1)).slice(-2).toString();
    var month_now_word = new Date().toLocaleString('ru', {       
        month: 'long'
    });

    if (date.match(/\d\d.\d\d.\d\d\d\d/)) {
        return date == `${day_now}.${month_now}.${year_now}` 
        ? true
        : false
    } else {
        return date.toLowerCase() == `${month_now_word} ${year_now}` 
        ? true 
        : false
    }
}