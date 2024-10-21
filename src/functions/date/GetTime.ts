function GetTime(date: string) {
    const time = new Date(date)
    let currentTime = new Date()
    console.log(time + date)
    console.log(currentTime)

    

    const seconds = (currentTime.getTime() - time.getTime()) / 1000
    if (seconds < 60) {
        return seconds + " seconds ago"
    }
    else if (seconds < 3600) {
        return Math.trunc(seconds / 60) + " minutes ago"
    }
    else if (seconds < 86400) {
        return Math.trunc(seconds / 3600) + " hours ago"
    }
    else {
        return Math.trunc(seconds / 86400) + " days ago"
    }
}

export default GetTime