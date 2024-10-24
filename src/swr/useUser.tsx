import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useUser(id: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `user/${id}`, fetcher)

    return {
        user: data,
        isLoading,
        isError: error
    }
}

export default useUser