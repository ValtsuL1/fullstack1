import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useProfileComments(id: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `comment/profile/${id}`, fetcher)

    return {
        comments: data,
        isLoading,
        isError: error
    }
}

export default useProfileComments