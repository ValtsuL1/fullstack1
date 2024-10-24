import axios from "axios";

function GetFetcher() {
    const url: string = 'http://localhost:3000/';

    const fetcher = async (url: string) => await axios.get(url, {
    headers: { Authorization: "Bearer " + sessionStorage.getItem('token') }
        }).then(res => res.data);

    return {
        fetcher,
        url
    }
}

export default GetFetcher