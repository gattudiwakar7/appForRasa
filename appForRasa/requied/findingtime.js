function dateTime() {
    let dt = new Date()

    let date = ("0" + dt.getDate()).slice(-2)
    let month = ("0" + (1 + dt.getMonth())).slice(-2)
    let year = dt.getFullYear();
    let hour = dt.getHours()
    let minutes = dt.getMinutes()
    let sec = dt.getSeconds()
    let milisec = dt.getMilliseconds()

    var output = date + "-" + month + "-" + year + ":" + hour + "-" + minutes + "-" + sec + "-" + milisec
    return output

}

module.exports = { dateTime }