import useSWR from 'swr';
import axios from 'axios';

const url: string = 'http://localhost:3000/';

const fetcher = async (url: string) => await axios.get(url, {
    headers: { Authorization: "Bearer " + sessionStorage.getItem('token') }
}).then(res => res.data);

function useProfileComments(id: number) {
    const { data, error, isLoading } = useSWR(url + `comment/profile/${id}`, fetcher)

    return {
        comments: data,
        isLoading,
        isError: error
    }
}

export default useProfileComments