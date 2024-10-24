import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useUserposts() {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `user-post/`, fetcher)
    
    return {
        userposts: data,
        isLoading,
        isError: error
    }
}

export default useUserposts