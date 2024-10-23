function GetTime(date: string) {
    const time = new Date(date)
    let currentTime = new Date()

    const seconds = (currentTime.getTime() - time.getTime()) / 1000
    if (seconds < 60) {
        return Math.trunc(seconds) + " s ago"
    }
    else if (seconds < 3600) {
        return Math.trunc(seconds / 60) + " m ago"
    }
    else if (seconds < 86400) {
        return Math.trunc(seconds / 3600) + " h ago"
    }
    else {
        return Math.trunc(seconds / 86400) + " d ago"
    }
}

export default GetTime