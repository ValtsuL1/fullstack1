import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useComment(id: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `comment/${id}`, fetcher)

    return {
        comment: data,
        isLoading,
        isError: error
    }
}

export default useComment