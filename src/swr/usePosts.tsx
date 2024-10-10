import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const url: string = 'http://localhost:3000/';

function useUserposts() {
    const { data, error, isLoading } = useSWR(url + `user_post`, fetcher)

    return {
        userposts: data,
        isLoading,
        isError: error
    }
}

export default useUserposts