import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useComments(userPostId: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `comment/${userPostId}`, fetcher)

    return {
        comments: data,
        isLoading,
        isError: error
    }
}

export default useComments