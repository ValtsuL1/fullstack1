

function FormatDate(date: string) {
    const newDate = date
        .split("T")
        .join(" ")
        .split(".")[0]
    return newDate
}

export default FormatDate