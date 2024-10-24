import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useUserpost(id: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `user-post/${id}`, fetcher)

    return {
        userpost: data,
        isLoading,
        isError: error
    }
}

export default useUserpost