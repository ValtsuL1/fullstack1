import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useUsers() {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `user`, fetcher)

    return {
        users: data,
        isLoading,
        isError: error
    }
}

export default useUsers