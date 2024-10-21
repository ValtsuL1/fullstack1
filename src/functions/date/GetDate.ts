

function GetDate() {

    function formatDate(date: string) {
        date = "0" + date
        return date
    }

    const date = new Date()
    
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    let hour = date.getHours().toString()
    let minute = date.getMinutes().toString()
    let second = date.getSeconds().toString()

    if (hour.length < 2) {
        hour = formatDate(hour)
    }
    if (minute.length < 2) {
        minute = formatDate(minute)
    }
    if (second.length < 2) {
        second = formatDate(second)
    }

    const currentDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    return currentDate
}

export default GetDate