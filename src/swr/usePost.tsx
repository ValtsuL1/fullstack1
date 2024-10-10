import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const url: string = 'http://localhost:3000/';

function useUserpost(id: number) {
    const { data, error, isLoading } = useSWR(url + `user_post/${id}`, fetcher)

    return {
        userpost: data,
        isLoading,
        isError: error
    }
}

export default useUserpost