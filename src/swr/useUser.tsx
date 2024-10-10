import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const url: string = 'http://localhost:3000/';

function useUser(id: number) {
    const { data, error, isLoading } = useSWR(url + `user/${id}`, fetcher)

    return {
        user: data,
        isLoading,
        isError: error
    }
}

export default useUser